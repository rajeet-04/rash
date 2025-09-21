'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  const loadingSteps = [
    { label: 'Initializing core systems...', detail: 'Setting up runtime environment', duration: 700 },
    { label: 'Loading framework modules...', detail: 'React • Next.js • TypeScript', duration: 600 },
    { label: 'Compiling components...', detail: 'Header • Hero • Projects • Contact', duration: 700 },
    { label: 'Applying theme configuration...', detail: 'Dark mode • Color schemes • Animations', duration: 500 },
    { label: 'Optimizing performance...', detail: 'Code splitting • Asset compression', duration: 400 },
    { label: 'Portfolio ready!', detail: 'Welcome to RASH Portfolio', duration: 300 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const stepDuration = loadingSteps[currentStep].duration
      const progressInterval = stepDuration / 100

      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / loadingSteps.length) / 100
          if (newProgress >= (currentStep + 1) * (100 / loadingSteps.length)) {
            clearInterval(interval)
            if (currentStep < loadingSteps.length - 1) {
              setTimeout(() => setCurrentStep(currentStep + 1), 100)
            } else {
              setTimeout(() => onComplete(), 500)
            }
            return (currentStep + 1) * (100 / loadingSteps.length)
          }
          return newProgress
        })
      }, progressInterval)

      return () => clearInterval(interval)
    }
  }, [currentStep, loadingSteps, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1117] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, #21262D 1px, transparent 1px),
              linear-gradient(180deg, #21262D 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Code Background Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <motion.div
            className="absolute top-10 left-10 font-mono text-xs text-[#58A6FF] leading-relaxed"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div>const portfolio = {`{`}</div>
            <div>&nbsp;&nbsp;name: 'RASH',</div>
            <div>&nbsp;&nbsp;type: 'Developer Portfolio',</div>
            <div>&nbsp;&nbsp;tech: ['React', 'Next.js', 'TypeScript'],</div>
            <div>&nbsp;&nbsp;status: 'loading...'</div>
            <div>{`}`}</div>
          </motion.div>

          <motion.div
            className="absolute top-32 right-16 font-mono text-xs text-[#7EE787] leading-relaxed"
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <div>function initPortfolio() {`{`}</div>
            <div>&nbsp;&nbsp;console.log('Initializing...');</div>
            <div>&nbsp;&nbsp;return loadComponents();</div>
            <div>{`}`}</div>
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-20 font-mono text-xs text-[#FFA657] leading-relaxed"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div>// Loading portfolio modules</div>
            <div>import Hero from './Hero';</div>
            <div>import Projects from './Projects';</div>
            <div>import Contact from './Contact';</div>
          </motion.div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#58A6FF] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo Animation */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="mb-12"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#58A6FF] opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Logo Container */}
                  <div className="relative w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#21262D] to-[#161B22] border border-[#30363D] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#58A6FF]/10 to-transparent" />
                    
                    {/* RASH Text with Typewriter Effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-bold text-[#F0F6FC] font-mono tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        {'RASH'.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            className="inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.8 + index * 0.1,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.span>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-[#FF7B72] rounded-full opacity-60" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFA657] rounded-full opacity-60" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#7EE787] rounded-full opacity-60" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#58A6FF] rounded-full opacity-60" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal Window */}
          <motion.div
            className="mb-8 w-96 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {/* Terminal Header */}
            <div className="bg-[#21262D] border border-[#30363D] rounded-t-lg px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#27CA3F] rounded-full"></div>
                </div>
                <span className="text-[#8B949E] text-sm font-mono">portfolio.dev</span>
              </div>
              <div className="text-[#8B949E] text-xs font-mono">bash</div>
            </div>

            {/* Terminal Body */}
            <div className="bg-[#0D1117] border-x border-b border-[#30363D] rounded-b-lg px-4 py-4 min-h-[120px]">
              <div className="font-mono text-sm space-y-2">
                {/* Command Prompt */}
                <div className="flex items-center text-[#7EE787]">
                  <span className="text-[#58A6FF]">rajeet@portfolio</span>
                  <span className="text-[#F0F6FC]">:</span>
                  <span className="text-[#58A6FF]">~</span>
                  <span className="text-[#F0F6FC]">$ </span>
                  <motion.span
                    className="text-[#F0F6FC]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                  >
                    npm run dev
                  </motion.span>
                </div>

                {/* Loading Status */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.span
                        className="text-[#58A6FF]"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ▶
                      </motion.span>
                      <span className="text-[#F0F6FC]">
                        {loadingSteps[currentStep]?.label}
                      </span>
                    </div>
                    <div className="text-[#8B949E] text-xs ml-4">
                      {loadingSteps[currentStep]?.detail}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Blinking Cursor */}
                <div className="flex items-center mt-3">
                  <span className="text-[#58A6FF]">rajeet@portfolio</span>
                  <span className="text-[#F0F6FC]">:</span>
                  <span className="text-[#58A6FF]">~</span>
                  <span className="text-[#F0F6FC]">$ </span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#F0F6FC] ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-80 max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            {/* Progress Container */}
            <div className="relative">
              <div className="h-2 bg-[#21262D] rounded-full border border-[#30363D] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#58A6FF] to-[#79C0FF] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress Info */}
              <motion.div
                className="mt-4 flex justify-between items-center text-xs font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[#8B949E]">
                    {Math.round(progress)}%
                  </span>
                  <span className="text-[#58A6FF]">
                    [{currentStep + 1}/{loadingSteps.length}]
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[#7EE787]">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                  <span>{Math.round((Date.now() / 1000) % 60)}s</span>
                </div>
              </motion.div>

              {/* System Info */}
              <motion.div
                className="mt-3 text-[#8B949E] text-xs font-mono flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.3 }}
              >
                <span>Node.js v20.x.x</span>
                <span>React v18.x.x</span>
                <span>TypeScript v5.x.x</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex justify-center space-x-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.3 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-[#58A6FF] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}