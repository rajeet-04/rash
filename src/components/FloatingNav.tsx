'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HomeIcon,
    UserIcon,
    BriefcaseIcon,
    CodeBracketIcon,
    EnvelopeIcon,
    MoonIcon,
    SunIcon,
    EyeIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('home')
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [highContrast, setHighContrast] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check if high contrast is saved
        const savedContrast = localStorage.getItem('high-contrast')
        if (savedContrast === 'true') {
            setHighContrast(true)
            document.documentElement.classList.add('high-contrast')
        }
    }, [])

    const navItems = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'about', icon: UserIcon, label: 'About' },
        { id: 'projects', icon: CodeBracketIcon, label: 'Projects' },
        { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
        { id: 'contact', icon: EnvelopeIcon, label: 'Contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)

            const sections = navItems.map(item => document.getElementById(item.id))
            const scrollPosition = window.scrollY + window.innerHeight / 3

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, navItems])

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        section?.scrollIntoView({ behavior: 'smooth' })
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    const toggleHighContrast = () => {
        const newValue = !highContrast
        setHighContrast(newValue)
        localStorage.setItem('high-contrast', String(newValue))

        if (newValue) {
            document.documentElement.classList.add('high-contrast')
        } else {
            document.documentElement.classList.remove('high-contrast')
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
                >
                    <div className="midnight-glass-strong px-2 py-2 flex items-center gap-1">
                        {/* Navigation Items */}
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`relative p-3 rounded-xl transition-all duration-300 group ${activeSection === item.id
                                        ? 'text-[rgb(var(--primary))]'
                                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={item.label}
                            >
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-[rgb(var(--primary)_/_0.15)] rounded-xl"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <item.icon className="w-5 h-5 relative z-10" />

                                {/* Tooltip */}
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[rgb(var(--secondary))] text-[rgb(var(--foreground))] text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[rgb(var(--border))]">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-6 bg-[rgb(var(--border))] mx-1" />

                        {/* High Contrast Toggle */}
                        {mounted && (
                            <motion.button
                                onClick={toggleHighContrast}
                                className={`p-3 rounded-xl transition-colors ${highContrast
                                        ? 'text-[rgb(var(--primary))] bg-[rgb(var(--primary)_/_0.1)]'
                                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle high contrast mode"
                                title="High Contrast"
                            >
                                <EyeIcon className="w-5 h-5" />
                            </motion.button>
                        )}

                        {/* Theme Toggle */}
                        {mounted && (
                            <motion.button
                                onClick={toggleTheme}
                                className="p-3 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                aria-label="Toggle dark mode"
                            >
                                {resolvedTheme === 'dark' ? (
                                    <SunIcon className="w-5 h-5" />
                                ) : (
                                    <MoonIcon className="w-5 h-5" />
                                )}
                            </motion.button>
                        )}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
