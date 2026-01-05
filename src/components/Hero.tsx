'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Cloud Architect",
    "Open Source Contributor"
  ]

  // Typing effect for roles
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]

    if (isTyping) {
      if (displayedText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 40)
        return () => clearTimeout(timeout)
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        setIsTyping(true)
      }
    }
  }, [displayedText, isTyping, currentRoleIndex, roles])

  const handleScrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--primary))] rounded-full blur-[150px] opacity-[0.08]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[rgb(var(--accent-secondary))] rounded-full blur-[120px] opacity-[0.06]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
        {/* Terminal-style intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="terminal-card max-w-2xl mx-auto md:mx-0">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">rajeet@portfolio ~ $</span>
            </div>
            <div className="terminal-body">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[rgb(var(--muted-foreground))] text-sm md:text-base"
              >
                <span className="text-[rgb(var(--primary))]">$</span> whoami
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[rgb(var(--foreground))] text-sm md:text-base mt-2"
              >
                → Rajeet Ash
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-[rgb(var(--muted-foreground))] text-sm md:text-base mt-4"
              >
                <span className="text-[rgb(var(--primary))]">$</span> cat role.txt
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-[rgb(var(--primary))] text-sm md:text-base mt-2"
              >
                → {displayedText}<span className="typing-cursor" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="text-center md:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 midnight-glass text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[rgb(var(--foreground))]">Available for work</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="text-[rgb(var(--foreground))]">Hi, I'm </span>
            <span className="gradient-text-animated">Rajeet</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[rgb(var(--muted-foreground))] mb-8"
          >
            Creative Developer & <span className="text-[rgb(var(--primary))]">Tech Innovator</span>
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-base md:text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed"
          >
            A 21-year-old B.Tech student at <span className="text-[rgb(var(--foreground))] font-medium">IEM Newtown</span>,
            passionate about blending creativity with technology. I create digital experiences that
            captivate and inspire users.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <motion.button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={handleScrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-3 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <motion.div
              className="w-10 h-10 rounded-full midnight-glass flex items-center justify-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDownIcon className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </section>
  )
}