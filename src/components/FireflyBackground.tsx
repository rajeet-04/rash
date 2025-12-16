'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface Firefly {
    id: number
    x: number
    y: number
    size: number
    color: string
    duration: number
    delay: number
    blur: number
    opacity: number
}

export default function FireflyBackground() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    // Initialize dimensions on mount
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    // Generate fireflies - memoized to prevent regeneration
    const fireflies = useMemo<Firefly[]>(() => {
        if (dimensions.width === 0) return []

        const colors = ['#FFA500', '#22D3EE', '#FFD700', '#A78BFA', '#F472B6']
        const count = 30
        const flies: Firefly[] = []

        for (let i = 0; i < count; i++) {
            flies.push({
                id: i,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: Math.random() * 7 + 5, // 5-12px for a brighter core
                color: colors[Math.floor(Math.random() * colors.length)],
                duration: Math.random() * 25 + 15, // 15-40s
                delay: Math.random() * -20, // Stagger start times
                blur: Math.random() * 16 + 10, // 10-26px blur for tighter glow
                opacity: Math.random() * 0.45 + 0.45, // 0.45-0.9 for stronger light
            })
        }

        return flies
    }, [dimensions.width, dimensions.height])

    // Generate random Brownian motion path
    const generatePath = (fly: Firefly) => {
        const points = 8
        const path = []
        const margin = 100

        for (let i = 0; i < points; i++) {
            path.push({
                x: Math.max(margin, Math.min(dimensions.width - margin, fly.x + (Math.random() - 0.5) * 300)),
                y: Math.max(margin, Math.min(dimensions.height - margin, fly.y + (Math.random() - 0.5) * 300)),
            })
        }

        return path
    }

    if (dimensions.width === 0) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {fireflies.map((fly) => {
                const path = generatePath(fly)

                return (
                    <motion.div
                        key={fly.id}
                        className="absolute rounded-full"
                        style={{
                            width: fly.size,
                            height: fly.size,
                            background: `radial-gradient(circle, ${fly.color}FF 0%, ${fly.color}E6 35%, ${fly.color}99 60%, transparent 100%)`,
                            filter: `blur(${fly.blur}px)`,
                            boxShadow: `0 0 ${fly.blur * 1.4}px ${fly.color}B3, 0 0 ${fly.blur * 2.4}px ${fly.color}80, 0 0 ${fly.blur * 3.2}px ${fly.color}4D`,
                            mixBlendMode: 'screen',
                            willChange: 'transform, opacity',
                        }}
                        initial={{
                            x: fly.x,
                            y: fly.y,
                            opacity: 0,
                        }}
                        animate={{
                            x: path.map(p => p.x),
                            y: path.map(p => p.y),
                            opacity: [0, fly.opacity, fly.opacity * 0.8, fly.opacity, 0],
                            scale: [1, 1.2, 0.9, 1.1, 1],
                        }}
                        transition={{
                            x: {
                                duration: fly.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: fly.delay,
                            },
                            y: {
                                duration: fly.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: fly.delay,
                            },
                            opacity: {
                                duration: fly.duration * 0.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: fly.delay,
                            },
                            scale: {
                                duration: fly.duration * 0.4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: fly.delay * 0.5,
                            },
                        }}
                    />
                )
            })}
        </div>
    )
}
