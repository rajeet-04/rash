'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SunIcon, 
  MoonIcon, 
  EyeIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

export default function AdvancedThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [contrastMode, setContrastMode] = useState('normal')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Load contrast preference
    const savedContrast = localStorage.getItem('contrast-mode') || 'normal'
    setContrastMode(savedContrast)
    
    // Apply contrast class to document
    if (savedContrast === 'high') {
      document.documentElement.classList.add('contrast-high')
    }
  }, [])

  const toggleContrast = () => {
    const newContrast = contrastMode === 'normal' ? 'high' : 'normal'
    setContrastMode(newContrast)
    localStorage.setItem('contrast-mode', newContrast)
    
    if (newContrast === 'high') {
      document.documentElement.classList.add('contrast-high')
    } else {
      document.documentElement.classList.remove('contrast-high')
    }
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
    )
  }

  const themeOptions = [
    {
      id: 'light',
      name: 'Light',
      icon: SunIcon,
      colors: 'from-amber-400 to-orange-500'
    },
    {
      id: 'dark', 
      name: 'Dark',
      icon: MoonIcon,
      colors: 'from-indigo-500 to-purple-600'
    }
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-background border-2 border-border hover:border-primary transition-all duration-200 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme settings"
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5 text-text-primary" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-56 bg-background border-2 border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">
                Theme Settings
              </h3>
            </div>

            {/* Theme Options */}
            <div className="p-3 space-y-2">
              <div className="text-xs font-medium text-text-tertiary mb-2">
                APPEARANCE
              </div>
              
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = theme === option.id
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'hover:bg-muted text-text-secondary'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-1.5 rounded-md bg-gradient-to-br ${option.colors}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{option.name}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Contrast Settings */}
            <div className="border-t border-border p-3">
              <div className="text-xs font-medium text-text-tertiary mb-2">
                CONTRAST
              </div>
              
              <motion.button
                onClick={toggleContrast}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  contrastMode === 'high'
                    ? 'bg-accent-500/10 text-accent-500 border border-accent-500/20'
                    : 'hover:bg-muted text-text-secondary'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500 to-pink-600">
                  <EyeIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">High Contrast</div>
                  <div className="text-xs text-text-tertiary">
                    {contrastMode === 'high' ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <motion.div
                  className={`w-8 h-4 rounded-full border-2 transition-colors duration-200 ${
                    contrastMode === 'high'
                      ? 'bg-accent-500 border-accent-500'
                      : 'bg-muted border-border'
                  }`}
                  layout
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full mt-0.5"
                    animate={{ x: contrastMode === 'high' ? 14 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}