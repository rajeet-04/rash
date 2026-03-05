'use client'

import { useEffect, useState, useMemo } from 'react'

interface Firefly {
    id: number
    x: number
    y: number
    size: number
    color: string
    duration: number
    delay: number
}

export default function FireflyBackground() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)

        setIsDark(document.documentElement.classList.contains('dark'))

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'))
        })
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        })

        return () => {
            window.removeEventListener('resize', updateDimensions)
            observer.disconnect()
        }
    }, [])

    // Vibrant colors that pop in both modes
    const colors = isDark 
        ? ['#FFA500', '#22D3EE', '#FFD700', '#A78BFA', '#F472B6']  // Dark mode - neon
        : ['#0891B2', '#7C3AED', '#DB2777', '#059669', '#D97706']  // Light mode - vibrant, professional

    const count = 8
    const fireflies = useMemo<Firefly[]>(() => {
        if (dimensions.width === 0) return []

        const flies: Firefly[] = []

        for (let i = 0; i < count; i++) {
            flies.push({
                id: i,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: Math.random() * 4 + 3,
                color: colors[i % colors.length],
                duration: Math.random() * 10 + 15,
                delay: Math.random() * -15,
            })
        }

        return flies
    }, [dimensions.width, dimensions.height, colors])

    if (dimensions.width === 0) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {fireflies.map((fly) => (
                <div
                    key={fly.id}
                    className="absolute rounded-full animate-firefly"
                    style={{
                        left: fly.x,
                        top: fly.y,
                        width: fly.size,
                        height: fly.size,
                        backgroundColor: fly.color,
                        boxShadow: `0 0 ${fly.size * 2}px ${fly.color}, 0 0 ${fly.size * 4}px ${fly.color}`,
                        opacity: isDark ? 0.6 : 0.7,
                        animationDelay: `${fly.delay}s`,
                        animationDuration: `${fly.duration}s`,
                        willChange: 'transform, opacity',
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes firefly-float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translate(30px, -30px) scale(1.2);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translate(-20px, 20px) scale(0.8);
                        opacity: 0.5;
                    }
                    75% {
                        transform: translate(40px, 10px) scale(1.1);
                        opacity: 0.8;
                    }
                }
                .animate-firefly {
                    animation: firefly-float ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
