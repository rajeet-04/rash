'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon, EyeIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

// Simplified toggle: cycles through System -> Light -> Dark -> Dark (High Contrast)
export default function AdvancedThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()
  const [mode, setMode] = useState<'system' | 'light' | 'dark' | 'dark-contrast'>('system')

  useEffect(() => {
    setMounted(true)

    // Load saved combined mode if present; default to 'system'
    const saved = localStorage.getItem('theme-mode') as
      | 'system'
      | 'light'
      | 'dark'
      | 'dark-contrast'
      | null

    const initial = saved ?? 'system'
    setMode(initial)
    applyMode(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyMode = (m: 'system' | 'light' | 'dark' | 'dark-contrast') => {
    if (m === 'system') {
      setTheme('system')
      document.documentElement.classList.remove('contrast-high')
    } else if (m === 'light') {
      setTheme('light')
      document.documentElement.classList.remove('contrast-high')
    } else if (m === 'dark') {
      setTheme('dark')
      document.documentElement.classList.remove('contrast-high')
    } else if (m === 'dark-contrast') {
      setTheme('dark')
      document.documentElement.classList.add('contrast-high')
    }
  }

  const cycle = () => {
    // order: system -> light -> dark -> dark-contrast -> system
    const next: typeof mode =
      mode === 'system' ? 'light' : mode === 'light' ? 'dark' : mode === 'dark' ? 'dark-contrast' : 'system'
    setMode(next)
    localStorage.setItem('theme-mode', next)
    applyMode(next)
  }

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
  }

  const iconProps = 'w-5 h-5 text-text-primary'
  const label =
    mode === 'system' ? 'System' : mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'Dark (High Contrast)'

  return (
    <motion.button
      onClick={cycle}
      className="p-2.5 rounded-xl bg-background border-2 border-border hover:border-primary transition-all duration-200 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Toggle theme: ${label}`}
      title={label}
    >
      {mode === 'system' && <ComputerDesktopIcon className={iconProps} />}
      {mode === 'light' && <SunIcon className={iconProps} />}
      {mode === 'dark' && <MoonIcon className={iconProps} />}
      {mode === 'dark-contrast' && <EyeIcon className={iconProps} />}
    </motion.button>
  )
}