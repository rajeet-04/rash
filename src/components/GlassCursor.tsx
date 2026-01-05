'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence, useAnimation } from 'framer-motion'

interface Ripple {
    id: number
    x: number
    y: number
    color: string
}

// Generate shades of a color for the washing effect
function generateShades(baseColor: string): string[] {
    // Parse RGB from "rgb(r, g, b)"
    const match = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (!match) return [baseColor]

    const r = parseInt(match[1])
    const g = parseInt(match[2])
    const b = parseInt(match[3])

    // Create 5 shades: lighter -> base -> slightly different hue -> base -> lighter
    return [
        `rgb(${Math.min(r + 30, 255)}, ${Math.min(g + 30, 255)}, ${Math.min(b + 30, 255)})`,
        baseColor,
        `rgb(${Math.max(r - 20, 0)}, ${Math.min(g + 20, 255)}, ${Math.min(b + 10, 255)})`,
        baseColor,
        `rgb(${Math.min(r + 20, 255)}, ${Math.max(g - 10, 0)}, ${Math.min(b + 30, 255)})`,
        baseColor,
    ]
}

export default function GlassCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [ripples, setRipples] = useState<Ripple[]>([])
    const [colorIndex, setColorIndex] = useState(0)
    const [isMoving, setIsMoving] = useState(false)

    const rippleIdRef = useRef(0)
    const lastMergeTime = useRef(0)
    const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const controls = useAnimation()

    const springConfig = { damping: 28, stiffness: 400, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Trailing dot springs (slower - so it lags behind)
    const trailConfig = { damping: 25, stiffness: 80, mass: 1.2 }
    const trailXSpring = useSpring(cursorX, trailConfig)
    const trailYSpring = useSpring(cursorY, trailConfig)

    // Neon palette for the beat (main colors)
    const beatColors = [
        'rgb(0, 217, 255)',   // Cyan
        'rgb(255, 0, 128)',   // Magenta
        'rgb(52, 211, 153)',  // Emerald
        'rgb(255, 183, 0)',   // Amber
        'rgb(139, 92, 246)',  // Violet
    ]

    const currentColor = beatColors[colorIndex]

    // Generate shades for washing effect based on current main color
    const colorShades = useMemo(() => generateShades(currentColor), [currentColor])

    // Detect when trailing dot merges with main cursor (user stops moving)
    useEffect(() => {
        const checkMerge = () => {
            const mainX = cursorXSpring.get()
            const mainY = cursorYSpring.get()
            const trailX = trailXSpring.get()
            const trailY = trailYSpring.get()

            const distance = Math.sqrt((mainX - trailX) ** 2 + (mainY - trailY) ** 2)
            const now = Date.now()

            // If trail caught up (distance < 5px) and we were moving, trigger beat
            if (distance < 5 && isMoving && (now - lastMergeTime.current > 200)) {
                lastMergeTime.current = now

                // Color change to next main color
                setColorIndex((prev) => (prev + 1) % beatColors.length)

                // Beat pulse
                controls.start({
                    scale: [1, 1.5, 1],
                    transition: { duration: 0.25, ease: "backOut" }
                })

                setIsMoving(false)
            }
        }

        const unsubMain = cursorXSpring.on('change', checkMerge)
        const unsubTrail = trailXSpring.on('change', checkMerge)

        return () => {
            unsubMain()
            unsubTrail()
        }
    }, [cursorXSpring, cursorYSpring, trailXSpring, trailYSpring, isMoving, controls, beatColors.length])

    const triggerRipple = useCallback((x: number, y: number) => {
        const id = ++rippleIdRef.current
        setRipples(prev => [...prev, { id, x, y, color: currentColor }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800)
    }, [currentColor])

    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            setIsMobile(isTouchDevice)
            document.documentElement.style.cursor = isTouchDevice ? 'auto' : 'none'
        }

        checkMobile()
        if (isMobile) return

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            // Mark as moving
            setIsMoving(true)

            // Clear existing timeout
            if (moveTimeoutRef.current) {
                clearTimeout(moveTimeoutRef.current)
            }
        }

        const handleMouseOver = (e: Event) => {
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === 'A' || target.tagName === 'BUTTON' ||
                target.closest('a') || target.closest('button') ||
                target.hasAttribute('data-magnetic') ||
                target.classList.contains('cursor-pointer') ||
                target.style.cursor === 'pointer'

            if (isInteractive) setIsHovering(true)
        }

        const handleMouseOut = () => setIsHovering(false)
        const handleClick = (e: MouseEvent) => triggerRipple(e.clientX, e.clientY)

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
            window.removeEventListener('click', handleClick)
            document.documentElement.style.cursor = 'auto'
            if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
        }
    }, [cursorX, cursorY, isMobile, triggerRipple])

    if (isMobile) return null

    return (
        <>
            {/* Click Ripple Effects */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="pointer-events-none fixed z-[9997]"
                        style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%' }}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div
                            className="w-16 h-16 rounded-full border-2"
                            style={{
                                borderColor: ripple.color,
                                boxShadow: `0 0 20px ${ripple.color.replace('rgb', 'rgba').replace(')', ', 0.4)')}`
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Outer Glow Ring with color wash */}
            <motion.div
                className="pointer-events-none fixed z-[9996]"
                style={{ left: trailXSpring, top: trailYSpring, x: '-50%', y: '-50%' }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        width: 70,
                        height: 70,
                        filter: 'blur(20px)',
                        opacity: 0.2
                    }}
                    animate={{
                        backgroundColor: colorShades
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>

            {/* Main Cursor Dot */}
            <motion.div
                className="pointer-events-none fixed z-[9999]"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%'
                }}
            >
                <motion.div
                    className="relative"
                    animate={{ scale: isHovering ? 1.5 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    {/* Dot Core - The beating heart with color washing */}
                    <motion.div
                        animate={controls}
                        className="w-3.5 h-3.5 rounded-full relative overflow-hidden"
                    >
                        {/* Color wash layer - cycles through shades */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                                backgroundColor: colorShades,
                                boxShadow: colorShades.map(c =>
                                    `0 0 15px ${c.replace('rgb', 'rgba').replace(')', ', 0.6)')}, 0 0 30px ${c.replace('rgb', 'rgba').replace(')', ', 0.3)')}`
                                )
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>

                    {/* Ring on hover with wash */}
                    <motion.div
                        className="absolute inset-[-10px] rounded-full border-2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: isHovering ? 1 : 0.8,
                            opacity: isHovering ? 0.6 : 0,
                            borderColor: colorShades
                        }}
                        transition={{
                            scale: { type: 'spring', stiffness: 300, damping: 20 },
                            borderColor: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Trailing Dot with wash */}
            <motion.div
                className="pointer-events-none fixed z-[9998]"
                style={{
                    left: trailXSpring,
                    top: trailYSpring,
                    x: '-50%',
                    y: '-50%'
                }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full opacity-60"
                    animate={{
                        scale: isHovering ? 0 : 1,
                        backgroundColor: colorShades
                    }}
                    transition={{
                        scale: { type: 'spring', stiffness: 200, damping: 25 },
                        backgroundColor: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </motion.div>
        </>
    )
}
