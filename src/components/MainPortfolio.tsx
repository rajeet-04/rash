'use client'

import FloatingNav from './FloatingNav'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'

export default function MainPortfolio() {
  return (
    <div className="site-shell">
      <div className="content-layer">
        <FloatingNav />
        <main>
          <Hero />
          <Projects />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
