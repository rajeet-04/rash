'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'

// Custom hook to ensure section visibility when needed
function useSectionVisibility() {
  useEffect(() => {
    // Function to ensure all sections are visible
    const ensureSectionsVisible = () => {
      // Find all section elements that might be affected by animations
      const sections = document.querySelectorAll('section');
      
      // Loop through sections and ensure they're visible
      sections.forEach(section => {
        // If a section is not visible, make it visible
        if (section.style.opacity === '0' || 
            section.style.visibility === 'hidden' || 
            section.style.display === 'none') {
          section.style.opacity = '1';
          section.style.visibility = 'visible';
          section.style.display = 'block';
        }
      });
    };
    
    // Set up event listeners for common events that might trigger layout changes
    window.addEventListener('scroll', ensureSectionsVisible, { passive: true });
    window.addEventListener('resize', ensureSectionsVisible);
    
    // Create a MutationObserver to detect DOM changes (like filtering)
    const observer = new MutationObserver(() => {
      ensureSectionsVisible();
    });
    
    // Start observing the body for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Run once on mount
    ensureSectionsVisible();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', ensureSectionsVisible);
      window.removeEventListener('resize', ensureSectionsVisible);
      observer.disconnect();
    };
  }, []);
}

export default function MainPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use the custom hook to ensure sections are always visible
  useSectionVisibility()

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen bg-background transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-bg-secondary to-primary/5" />
        <div className="absolute inset-0 grid-bg opacity-[0.02] dark:opacity-[0.08]" />
        
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
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

        <Footer />
      </div>

      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <motion.div
            className="w-2 h-8 border border-primary rounded-full flex justify-center bg-background"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1 bg-primary rounded-full mt-1"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  )
}