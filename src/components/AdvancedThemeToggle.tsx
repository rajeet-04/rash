'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoonIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function AdvancedThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDarkContrast, setIsDarkContrast] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if high contrast is enabled
    const hasContrast = document.documentElement.classList.contains('contrast-high')
    setIsDarkContrast(hasContrast)

    // Load from localStorage
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'dark-contrast') {
      document.documentElement.classList.add('contrast-high')
      setIsDarkContrast(true)
    } else {
      document.documentElement.classList.remove('contrast-high')
      setIsDarkContrast(false)
    }
  }, [])

  const toggle = () => {
    const newContrast = !isDarkContrast
    setIsDarkContrast(newContrast)

    if (newContrast) {
      document.documentElement.classList.add('contrast-high')
      localStorage.setItem('theme-mode', 'dark-contrast')
    } else {
      document.documentElement.classList.remove('contrast-high')
      localStorage.setItem('theme-mode', 'dark')
    }
  }

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
  }

  return (
    <motion.button
      onClick={toggle}
      className="p-2.5 rounded-xl bg-background border-2 border-border hover:border-primary transition-all duration-200 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Toggle theme: ${isDarkContrast ? 'Dark High Contrast' : 'Dark'}`}
      title={isDarkContrast ? 'Dark High Contrast' : 'Dark'}
    >
      {isDarkContrast ? (
        <EyeIcon className="w-5 h-5 text-text-primary" />
      ) : (
        <MoonIcon className="w-5 h-5 text-text-primary" />
      )}
    </motion.button>
  )
}
