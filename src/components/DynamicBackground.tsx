'use client'

import { useEffect, useState } from 'react'

// Professional gradient mesh background with vibrant light mode
export default function DynamicBackground() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
      </div>
    )
  }

  // Light mode - vibrant and modern
  if (!isDark) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Base - soft warm white */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f8fafc 75%, #fafafa 100%)',
          }}
        />

        {/* Vibrant gradient orbs - modern tech aesthetic */}
        <div className="absolute inset-0">
          {/* Primary cyan orb - top left */}
          <div 
            className="absolute animate-pulse-subtle"
            style={{
              top: '-5%',
              left: '-5%',
              width: '55%',
              height: '55%',
              background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          
          {/* Secondary purple orb - bottom right */}
          <div 
            className="absolute animate-pulse-subtle-delayed"
            style={{
              bottom: '-10%',
              right: '-10%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 70%)',
              filter: 'blur(35px)',
            }}
          />
          
          {/* Accent pink orb - center left */}
          <div 
            className="absolute animate-pulse-subtle"
            style={{
              top: '35%',
              left: '5%',
              width: '25%',
              height: '35%',
              background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
              filter: 'blur(25px)',
            }}
          />

          {/* Emerald accent - bottom left */}
          <div 
            className="absolute animate-pulse-subtle-delayed"
            style={{
              bottom: '10%',
              left: '25%',
              width: '30%',
              height: '25%',
              background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Amber highlight - top right */}
          <div 
            className="absolute"
            style={{
              top: '15%',
              right: '15%',
              width: '20%',
              height: '25%',
              background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.06) 0%, transparent 60%)',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* Subtle geometric lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1={0} y1={250} x2={400} y2={850} stroke="rgba(139, 92, 246, 0.08)" strokeWidth={0.5} />
          <line x1={1600} y1={0} x2={1920} y2={600} stroke="rgba(6, 182, 212, 0.06)" strokeWidth={0.5} />
          <line x1={600} y1={0} x2={200} y2={1080} stroke="rgba(236, 72, 153, 0.04)" strokeWidth={0.3} />
        </svg>

        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Soft vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        <style jsx>{`
          @keyframes pulse-subtle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
          }
          .animate-pulse-subtle {
            animation: pulse-subtle 8s ease-in-out infinite;
          }
          @keyframes pulse-subtle-delayed {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.03); }
          }
          .animate-pulse-subtle-delayed {
            animation: pulse-subtle-delayed 10s ease-in-out infinite;
            animation-delay: 2s;
          }
        `}</style>
      </div>
    )
  }

  // Dark mode - original vibrant design
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute"
          style={{
            top: '-10%',
            left: '-5%',
            width: '50%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(0, 217, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute"
          style={{
            bottom: '-15%',
            right: '-10%',
            width: '55%',
            height: '70%',
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute"
          style={{
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.04) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1={0} y1={200} x2={500} y2={900} stroke="rgba(168, 85, 247, 0.05)" strokeWidth={0.5} />
        <line x1={1400} y1={0} x2={1920} y2={700} stroke="rgba(0, 217, 255, 0.04)" strokeWidth={0.5} />
        <line x1={800} y1={0} x2={200} y2={1080} stroke="rgba(52, 211, 153, 0.03)" strokeWidth={0.3} />
      </svg>

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  )
}
