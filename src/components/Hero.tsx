'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

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
            stagger: 0.1,
            delay: 0.5,
          }
        )
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  const handleScrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const title = "Creative Developer"
  const subtitle = "& Designer"

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <div className="hero-bg-element absolute inset-0 grid-bg opacity-10" />
        
        {[...Array(15)].map((_, i) => (
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
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-full h-full border border-primary-500/20 transform rotate-45" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'backOut', delay: 0.2 }}
        >
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
            <motion.img
              src="/rash.jpg"
              alt="Rajeet Ash"
              className="w-full h-full rounded-full object-cover border-4 border-primary-500 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-500/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-lg md:text-xl text-primary-400 font-arima">
            HEY 👋🏻, I'm
          </span>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-dynapuff font-bold leading-tight">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
              {title.split('').map((char, index) => (
                <span
                  key={index}
                  className="hero-title-char inline-block"
                  style={{ transformOrigin: '50% 50% -50px' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <div className="text-white mt-2">
              {subtitle.split('').map((char, index) => (
                <span
                  key={index}
                  className="hero-title-char inline-block"
                  style={{ transformOrigin: '50% 50% -50px' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </h1>
        </div>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-arima leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          A 19-year-old B.Tech student majoring in Computer Science Engineering at IEM Newtown, 
          blending creativity with technology to create stunning digital experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold text-lg shadow-lg hover-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            View My Work
          </motion.button>

          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-primary-500 text-primary-400 rounded-full font-semibold text-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.button
          onClick={handleScrollToNext}
          className="group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center space-y-2 text-gray-400 hover:text-primary-400 transition-colors duration-300">
            <span className="text-sm font-arima">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDownIcon className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  )
}