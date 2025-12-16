'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import anime from 'animejs'
import {
    HomeIcon,
    UserIcon,
    BriefcaseIcon,
    CodeBracketIcon,
    EnvelopeIcon,
    MoonIcon,
    EyeIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('home')
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const navRef = useRef<HTMLDivElement>(null)
    const blobRef = useRef<HTMLDivElement>(null)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navItems = [
        { id: 'home', label: 'Home', icon: HomeIcon },
        { id: 'about', label: 'About', icon: UserIcon },
        { id: 'projects', label: 'Projects', icon: CodeBracketIcon },
        { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
        { id: 'contact', label: 'Contact', icon: EnvelopeIcon },
    ]

    // Scroll detection for active section only
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Update active section based on scroll position
            const sections = navItems.map((item) => document.getElementById(item.id))
            const scrollPosition = currentScrollY + window.innerHeight / 2

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop
                    const sectionBottom = sectionTop + section.offsetHeight

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveSection(navItems[index].id)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [navItems])

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleNavClick = (itemId: string, index: number) => {
        setActiveSection(itemId)
        scrollToSection(itemId)

        // Anime.js liquid blob animation
        if (blobRef.current) {
            anime({
                targets: blobRef.current,
                translateX: `${index * 48}px`,
                scale: [1, 1.2, 1],
                easing: 'easeOutElastic(1, .6)',
                duration: 800,
            })
        }
    }

    const [isDarkContrast, setIsDarkContrast] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check initial state
        setIsDarkContrast(document.documentElement.classList.contains('contrast-high'))
    }, [])

    const toggleTheme = () => {
        if (isDarkContrast) {
            // Switch from dark-contrast to dark
            document.documentElement.classList.remove('contrast-high')
            setTheme('dark')
            localStorage.setItem('theme-mode', 'dark')
            setIsDarkContrast(false)
        } else {
            // Switch from dark to dark-contrast
            document.documentElement.classList.add('contrast-high')
            setTheme('dark')
            localStorage.setItem('theme-mode', 'dark-contrast')
            setIsDarkContrast(true)
        }
    }

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-0 right-0 w-full flex justify-center z-50 pointer-events-none"
            style={{ isolation: 'isolate' }}
        >
            <div className="relative pointer-events-auto px-8 py-2.5 rounded-full backdrop-blur-2xl border border-white/20 shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.6) 0%, rgba(22, 27, 34, 0.5) 100%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(88, 166, 255, 0.1)',
                }}
            >
                {/* Animated blob background */}
                <div
                    ref={blobRef}
                    className="absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl transition-all duration-500"
                    style={{ transform: 'translateY(-50%)' }}
                />

                <div className="relative flex items-center gap-2">
                    {/* Navigation items */}
                    {navItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.id

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavClick(item.id, index)}
                                className="group relative p-2.5 rounded-lg transition-all duration-300"
                                whileHover={{ scale: 1.08, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={item.label}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-all duration-300 ${isActive
                                        ? 'text-blue-400'
                                        : 'text-gray-400 group-hover:text-blue-300'
                                        }`}
                                />

                                {/* Tooltip */}
                                <motion.div
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10"
                                    initial={{ opacity: 0, y: 5 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900/90 border-r border-b border-white/10" />
                                </motion.div>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        )
                    })}

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Theme toggle */}
                    <motion.button
                        onClick={toggleTheme}
                        className="group relative p-2.5 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle theme"
                    >
                        {isDarkContrast ? (
                            <EyeIcon className="w-5 h-5 text-blue-400" />
                        ) : (
                            <MoonIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-300" />
                        )}

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10">
                            {isDarkContrast ? 'Dark' : 'High Contrast'}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900/90 border-r border-b border-white/10" />
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-2xl opacity-50" />
        </motion.nav>
    )
}
