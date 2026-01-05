'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import anime from 'animejs'

interface EntryScreenProps {
  onComplete: () => void
}

export default function EntryScreen({ onComplete }: EntryScreenProps) {
  const [currentText, setCurrentText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const targetText = 'MEEK'
  
  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    })

    timeline.from(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    })

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setCurrentText(targetText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        
        anime({
          targets: textRef.current,
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          duration: 1000,
          easing: 'easeInOutQuad',
          complete: () => {
            anime({
              targets: textRef.current,
              translateX: [0, -10, 10, -5, 5, 0],
              duration: 300,
              easing: 'easeInOutQuad',
              loop: 3,
              complete: () => {
                gsap.to(textRef.current, {
                  scale: 2,
                  opacity: 0,
                  duration: 0.8,
                  ease: "power2.in"
                })
                
                gsap.to(containerRef.current, {
                  scale: 1.5,
                  opacity: 0,
                  duration: 1,
                  delay: 0.3,
                  ease: "power2.inOut"
                })
              }
            })
          }
        })

        setTimeout(() => setShowCursor(false), 500)
      }
    }, 150)

    return () => {
      clearInterval(typingInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 noise-overlay" />
      
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          ref={textRef}
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-departure font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 tracking-wider">
            {currentText}
            {showCursor && (
              <span className="animate-blink text-primary-500">|</span>
            )}
          </h1>
          
          <div className="absolute inset-0 text-8xl md:text-9xl font-departure font-bold text-primary-500 opacity-30 blur-sm -z-10">
            {currentText}
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-xl md:text-2xl text-text-tertiary font-space tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Creative Developer & Designer
        </motion.p>

        <motion.div
          className="flex justify-center mt-12 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary-500 opacity-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary-500 opacity-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary-500 opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary-500 opacity-30" />
    </motion.div>
  )
}