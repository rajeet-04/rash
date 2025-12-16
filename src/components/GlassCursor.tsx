'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

interface Shockwave {
    id: number
    x: number
    y: number
}

interface MagneticElement {
    element: HTMLElement
    rect: DOMRect
    strength: number
}

export default function GlassCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [shockwaves, setShockwaves] = useState<Shockwave[]>([])
    const [magneticTarget, setMagneticTarget] = useState<MagneticElement | null>(null)
    const [depthLevel, setDepthLevel] = useState(0)

    const velocityRef = useRef({ x: 0, y: 0 })
    const lastPosRef = useRef({ x: 0, y: 0 })
    const lastTimeRef = useRef(Date.now())
    const shockwaveIdRef = useRef(0)

    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)

    // Velocity-based hue shift
    const hueShift = useMotionValue(0)
    const hueShiftSmooth = useSpring(hueShift, { damping: 20, stiffness: 100 })

    // Curated neon palette for smoother hue travel
    const primaryStops = ['#7DD3FC', '#60A5FA', '#C084FC', '#F97316']
    const secondaryStops = ['#38BDF8', '#A78BFA', '#FACC15', '#FB7185']

    // Transform hue to colors - ALL useTransform hooks at component top level
    const primaryColor = useTransform(hueShiftSmooth, [0, 30, 60, 100], primaryStops)
    const secondaryColor = useTransform(hueShiftSmooth, [0, 30, 60, 100], secondaryStops)

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
    const magneticSpringConfig = { damping: 15, stiffness: 150, mass: 0.8 }

    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Magnetic offset
    const magneticOffsetX = useMotionValue(0)
    const magneticOffsetY = useMotionValue(0)
    const magneticOffsetXSpring = useSpring(magneticOffsetX, magneticSpringConfig)
    const magneticOffsetYSpring = useSpring(magneticOffsetY, magneticSpringConfig)

    // Depth transforms
    const depthMotionValue = useMotionValue(0)
    const depthSpring = useSpring(depthMotionValue, { damping: 20, stiffness: 200 })
    const depthScale = useTransform(depthSpring, [0, 1, 2, 3], [1, 1.2, 1.4, 1.6])

    const depthRotateX = useMotionValue(0)
    const depthRotateY = useMotionValue(0)
    const depthRotateXSpring = useSpring(depthRotateX, { damping: 30, stiffness: 200 })
    const depthRotateYSpring = useSpring(depthRotateY, { damping: 30, stiffness: 200 })

    // Pre-computed gradient transforms - MUST be at top level
    const haloGradient = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `radial-gradient(circle, ${p}8C 0%, ${s}59 38%, transparent 72%)`
    )
    const cursorFilter = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `drop-shadow(0 0 10px ${p}CC) drop-shadow(0 0 18px ${s}99)`
    )
    const blurLayer1Bg = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `radial-gradient(circle, ${p}36 0%, ${s}29 46%, transparent 72%)`
    )
    const blurLayer2Bg = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `radial-gradient(circle, ${p}29 0%, ${s}1F 46%, transparent 74%)`
    )
    const blurLayer3Bg = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `radial-gradient(circle, ${p}1A 0%, ${s}10 52%, transparent 76%)`
    )
    const shockwaveShadow = useTransform(
        [primaryColor, secondaryColor],
        ([p, s]) => `0 0 24px ${p}A0, 0 0 46px ${s}73`
    )

    useEffect(() => {
        depthMotionValue.set(depthLevel)
    }, [depthLevel, depthMotionValue])

    const updateVelocity = useCallback((x: number, y: number) => {
        const now = Date.now()
        const dt = Math.max(now - lastTimeRef.current, 1)
        const dx = x - lastPosRef.current.x
        const dy = y - lastPosRef.current.y

        velocityRef.current = { x: dx / dt * 1000, y: dy / dt * 1000 }
        const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2)
        hueShift.set(Math.min(speed / 20, 100))

        lastPosRef.current = { x, y }
        lastTimeRef.current = now
    }, [hueShift])

    const findMagneticElements = useCallback((x: number, y: number): MagneticElement | null => {
        const elements = document.querySelectorAll('a, button, [data-magnetic], .cursor-pointer')
        let closest: MagneticElement | null = null
        let closestDist = Infinity

        elements.forEach((el) => {
            const element = el as HTMLElement
            const rect = element.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            const radius = Math.max(rect.width, rect.height) * 1.5
            const strength = parseFloat(element.getAttribute('data-magnetic') || '1')

            if (dist < radius && dist < closestDist && strength > 0) {
                closestDist = dist
                closest = { element, rect, strength }
            }
        })
        return closest
    }, [])

    const calculateMagneticPull = useCallback((x: number, y: number, target: MagneticElement) => {
        const { rect, strength } = target
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - x
        const dy = cy - y
        const dist = Math.sqrt(dx ** 2 + dy ** 2)
        const radius = Math.max(rect.width, rect.height) * 1.5

        if (dist > radius) return { offsetX: 0, offsetY: 0 }
        const pull = (1 - dist / radius) ** 2 * strength * 0.4
        return { offsetX: dx * pull, offsetY: dy * pull }
    }, [])

    const triggerShockwave = useCallback((x: number, y: number) => {
        const id = ++shockwaveIdRef.current
        setShockwaves((prev) => [...prev, { id, x, y }])
        setTimeout(() => setShockwaves((prev) => prev.filter((sw) => sw.id !== id)), 600)
    }, [])

    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            setIsMobile(isTouchDevice)
            document.documentElement.style.cursor = isTouchDevice ? 'auto' : 'none'
        }

        checkMobile()
        if (isMobile) return

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e
            cursorX.set(x)
            cursorY.set(y)
            updateVelocity(x, y)

            const magnetic = findMagneticElements(x, y)
            setMagneticTarget(magnetic)

            if (magnetic) {
                const { offsetX, offsetY } = calculateMagneticPull(x, y, magnetic)
                magneticOffsetX.set(offsetX)
                magneticOffsetY.set(offsetY)
                const { rect } = magnetic
                depthRotateY.set(((x - rect.left) / rect.width - 0.5) * 15)
                depthRotateX.set(-((y - rect.top) / rect.height - 0.5) * 15)
            } else {
                magneticOffsetX.set(0)
                magneticOffsetY.set(0)
                depthRotateX.set(0)
                depthRotateY.set(0)
            }
        }

        const handleMouseOver = (e: Event) => {
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === 'A' || target.tagName === 'BUTTON' ||
                target.closest('a') || target.closest('button') ||
                target.hasAttribute('data-magnetic') ||
                target.style.cursor === 'pointer' || target.classList.contains('cursor-pointer')

            if (isInteractive) {
                setIsHovering(true)
                const el = target.closest('[data-depth]') || target
                const depth = parseInt((el as HTMLElement).getAttribute('data-depth') || '1')
                setDepthLevel(Math.min(Math.max(depth, 1), 3))
            }
        }

        const handleMouseOut = () => {
            setIsHovering(false)
            setDepthLevel(0)
        }

        const handleClick = (e: MouseEvent) => triggerShockwave(e.clientX, e.clientY)

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
        }
    }, [cursorX, cursorY, isMobile, updateVelocity, findMagneticElements, calculateMagneticPull,
        magneticOffsetX, magneticOffsetY, depthRotateX, depthRotateY, triggerShockwave])

    if (isMobile) return null

    return (
        <>
            {/* Shockwave Effects */}
            <AnimatePresence>
                {shockwaves.map((sw) => (
                    <motion.div
                        key={sw.id}
                        className="pointer-events-none fixed z-[9997]"
                        style={{ left: sw.x, top: sw.y, x: '-50%', y: '-50%' }}
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <motion.div
                            className="rounded-full"
                            style={{
                                width: 60, height: 60,
                                border: '2px solid',
                                borderColor: primaryColor,
                                boxShadow: shockwaveShadow,
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Depth Blur Layer 3 (Farthest) */}
            <motion.div
                className="pointer-events-none fixed z-[9995]"
                style={{ left: cursorXSpring, top: cursorYSpring, x: '-50%', y: '-50%' }}
            >
                <motion.div
                    className="rounded-full"
                    style={{ width: 140, height: 140, background: blurLayer3Bg, filter: 'blur(40px)' }}
                    animate={{ scale: isHovering ? 1.6 : 1.2, opacity: depthLevel >= 3 ? 0.75 : 0.35 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
            </motion.div>

            {/* Depth Blur Layer 2 (Middle) */}
            <motion.div
                className="pointer-events-none fixed z-[9996]"
                style={{ left: cursorXSpring, top: cursorYSpring, x: '-50%', y: '-50%' }}
            >
                <motion.div
                    className="rounded-full"
                    style={{ width: 100, height: 100, background: blurLayer2Bg, filter: 'blur(30px)' }}
                    animate={{ scale: isHovering ? 1.4 : 1.1, opacity: depthLevel >= 2 ? 0.65 : 0.35 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                />
            </motion.div>

            {/* Depth Blur Layer 1 (Closest) */}
            <motion.div
                className="pointer-events-none fixed z-[9998]"
                style={{ left: cursorXSpring, top: cursorYSpring, x: '-50%', y: '-50%' }}
            >
                <motion.div
                    className="rounded-full"
                    style={{ width: 80, height: 80, background: blurLayer1Bg, filter: 'blur(24px)' }}
                    animate={{ scale: isHovering ? 1.25 : 1, opacity: isHovering ? 0.75 : 0.45 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
            </motion.div>

            {/* Main Cursor */}
            <motion.div
                className="pointer-events-none fixed z-[9999]"
                style={{
                    left: cursorXSpring, top: cursorYSpring,
                    x: magneticOffsetXSpring, y: magneticOffsetYSpring,
                    translateX: '-50%', translateY: '-50%',
                    mixBlendMode: 'color-dodge',
                }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX: depthRotateXSpring, rotateY: depthRotateYSpring, perspective: 1000 }}
                    animate={{ scale: 1, rotate: isHovering ? -3 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                    {/* Antigravity Halo */}
                    <motion.div
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{ background: haloGradient, filter: 'blur(22px)', scale: depthScale }}
                    />

                    {/* Firefly-style pulse */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: [0.35, 0.9, 0.5], scale: [0.95, 1.1, 0.98] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ mixBlendMode: 'screen' }}
                    >
                        <div
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.12) 55%, transparent 80%)',
                                boxShadow: '0 0 18px rgba(255,255,255,0.28)',
                            }}
                        />
                    </motion.div>

                    {/* Cursor SVG */}
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        style={{ filter: cursorFilter }}
                    >
                        <defs>
                            <linearGradient id="cursorGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <motion.stop offset="0%" style={{ stopColor: primaryColor }} />
                                <motion.stop offset="100%" style={{ stopColor: secondaryColor }} stopOpacity={0.85} />
                            </linearGradient>
                            <linearGradient id="cursorGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <motion.stop
                                    offset="0%"
                                    animate={{ stopColor: ['#E0E7FF', '#C7D2FE', '#E0E7FF'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    stopOpacity={0.9}
                                />
                                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.22} />
                                <motion.stop offset="100%" style={{ stopColor: secondaryColor }} stopOpacity={0.6} />
                            </linearGradient>
                            <filter id="magneticDistort" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency={magneticTarget ? 0.03 : 0.02} numOctaves={3} result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G" scale={magneticTarget ? 2 : 0} />
                            </filter>
                        </defs>
                        <g style={{ filter: magneticTarget ? 'url(#magneticDistort)' : 'none' }}>
                            <path fill="url(#cursorGrad1)" d="M18.584 12.854L8.091 2.361C7.319 1.59 6 2.136 6 3.227v15.044c0 .996 1.103 1.596 1.939 1.054l3.1-2.008 1.911 3.72c.447.87 1.515 1.213 2.385.766.87-.447 1.213-1.514.766-2.384l-1.878-3.651 3.735-.797c.974-.208 1.33-1.413.626-2.117z" />
                            <path fill="url(#cursorGrad2)" d="M7.234 2c-.63 0-1.234.489-1.234 1.227v15.044c0 .738.606 1.258 1.26 1.258.229 0 .463-.064.68-.204l3.1-2.008 1.911 3.72C13.264 21.649 13.884 22 14.527 22c.272 0 .549-.063.808-.196.87-.447 1.213-1.514.766-2.384l-1.878-3.651 3.735-.797c.974-.208 1.33-1.413.626-2.117L8.091 2.361C7.842 2.112 7.535 2 7.234 2z" />
                        </g>
                    </motion.svg>
                </motion.div>
            </motion.div>
        </>
    )
}
