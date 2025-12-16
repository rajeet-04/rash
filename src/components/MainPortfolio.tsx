'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FloatingNav from './FloatingNav'
import GlassCursor from './GlassCursor'
import FireflyBackground from './FireflyBackground'
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

      {/* Glass Cursor */}
      <GlassCursor />

      {/* Firefly Background Effect */}
      <FireflyBackground />

      <div className="relative z-10">
        <FloatingNav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </motion.div>
  )
}
