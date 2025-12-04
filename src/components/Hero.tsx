'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  const titles = [
    "Full Stack Developer",
    "AI/ML Engineer", 
    "Mobile App Developer",
    "UI/UX Designer",
    "Cloud Architect",
    "DevOps Engineer",
    "Data Scientist",
    "Software Engineer"
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { gsap } = require('gsap')
      
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.hero-title-char',
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: 'back.out',
            stagger: 0.05,
            delay: 0.5,
          }
        )
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  // Cycling titles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 4000) // Increased to 4 seconds for better readability

    return () => clearInterval(interval)
  }, [titles.length])

  const handleScrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const mainTitle = "Creative Developer"

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 bg-background transition-colors duration-500"
    >
      <div className="absolute inset-0">
        {/* High contrast grid pattern */}
        <div className="hero-bg-element absolute inset-0 opacity-[0.02] dark:opacity-[0.1]" style={{
          backgroundImage: `
            linear-gradient(90deg, #3b82f6 1px, transparent 1px),
            linear-gradient(180deg, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Animated geometric elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-bg-element absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-full h-full border-2 border-blue-500/10 dark:border-blue-400/20 transform rotate-45 rounded-lg" />
          </motion.div>
        ))}
        
        {/* High contrast gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 text-center px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-text-secondary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {'Hi, I am '.split('').map((char: string, index: number) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.05,
                    ease: 'easeOut'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-semibold"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                Rajeet
              </motion.span>
            </motion.h3>
          </div>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-full text-sm font-medium shadow-lg">
            <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></span>
            Available for work
          </span>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-space font-bold leading-tight">
            <div className="text-foreground mb-4 md:mb-6 font-space">
              {mainTitle.split('').map((char: string, index: number) => (
                <span
                  key={index}
                  className="hero-title-char inline-block"
                  style={{ transformOrigin: '50% 50% -50px' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            
            {/* Animated Cycling Subtitle with Enhanced Effects */}
            <div className="relative h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTitleIndex}
                  className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8"
                  initial={{ 
                    y: 120, 
                    opacity: 0, 
                    rotateX: 90,
                    scale: 0.8
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0,
                    scale: 1
                  }}
                  exit={{ 
                    y: -120, 
                    opacity: 0, 
                    rotateX: -90,
                    scale: 0.8
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 180,
                    damping: 25,
                    duration: 0.7
                  }}
                >
                  <div className="relative text-center w-full max-w-4xl">
                    {/* Background glow */}
                    <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-300 font-space font-extrabold blur-sm opacity-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight break-words">
                      &amp; {titles[currentTitleIndex]}
                    </div>
                    
                    {/* Main text */}
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-300 font-space font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight break-words">
                      &amp; {titles[currentTitleIndex]}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Enhanced typing indicators - positioned responsively */}
              <div className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gradient-to-t from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.6, 1.4, 0.6],
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Code-like brackets - positioned responsively */}
              <motion.div
                className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 text-blue-500/30 dark:text-blue-400/40 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono select-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'<'}
              </motion.div>
              <motion.div
                className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 text-blue-500/30 dark:text-blue-400/40 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono select-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {'>'}
              </motion.div>
            </div>
          </h1>
        </div>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          A passionate 20-year-old B.Tech student majoring in Computer Science Engineering at IEM Newtown, 
          specializing in full-stack development, AI/ML, and creating innovative digital solutions that bridge 
          creativity with cutting-edge technology.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-base md:text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 border border-blue-500/20 w-full sm:w-auto"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View My Work
              <motion.span
                className="group-hover:translate-x-1 transition-transform duration-200"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  'linear-gradient(to right, rgb(37 99 235), rgb(147 51 234))',
                  'linear-gradient(to right, rgb(147 51 234), rgb(79 70 229))',
                  'linear-gradient(to right, rgb(79 70 229), rgb(37 99 235))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>

          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-6 md:px-8 py-3 md:py-4 border-2 border-foreground text-foreground rounded-xl font-bold text-base md:text-lg hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm bg-background/80 shadow-xl w-full sm:w-auto"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">Get In Touch</span>
          </motion.button>
        </motion.div>

        <motion.button
          onClick={handleScrollToNext}
          className="group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ y: -3 }}
        >
          <div className="flex flex-col items-center space-y-3 text-text-tertiary hover:text-primary transition-colors duration-300">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-border hover:border-primary flex items-center justify-center transition-colors duration-300 bg-background/50 backdrop-blur-sm"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDownIcon className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}