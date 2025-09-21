'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EntryScreen from '@/components/EntryScreen'
import MainPortfolio from '@/components/MainPortfolio'

export default function Home() {
  const [showEntry, setShowEntry] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleEntryComplete = () => {
    setShowEntry(false)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {showEntry ? (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EntryScreen onComplete={handleEntryComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MainPortfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}