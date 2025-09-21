'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'

export default function MainPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { gsap } = require('gsap')
      const { ScrollTrigger } = require('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 100,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })

        gsap.utils.toArray('.float-element').forEach((element: any, index) => {
          gsap.to(element, {
            y: -20,
            duration: 2 + index * 0.1,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
          })
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen bg-dark-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 noise-overlay" />
        
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Header />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <footer className="fade-in-section bg-dark-800/50 backdrop-blur-lg border-t border-primary-500/20 py-8">
          <div className="container mx-auto px-6 text-center">
            <motion.p
              className="text-gray-400 text-sm"
              whileHover={{ color: '#ff3333' }}
              transition={{ duration: 0.3 }}
            >
              &copy; 2024 RAJEET ASH. All rights reserved. Built with passion and creativity.
            </motion.p>
          </div>
        </footer>
      </div>

      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
          <motion.div
            className="w-2 h-8 border border-primary-500 rounded-full flex justify-center"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1 bg-primary-500 rounded-full mt-1"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  )
}