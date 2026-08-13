'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('work')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--line)_/_0.65)] bg-[rgb(var(--bg)_/_0.82)] backdrop-blur-xl">
      <div className="container-shell flex min-h-[4.7rem] items-center justify-between gap-5">
        <a href="#home" className="group flex items-center gap-3" aria-label="Rajeet Ash home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--accent)_/_0.55)] bg-[rgb(var(--accent)_/_0.08)] font-mono text-sm font-bold text-[rgb(var(--accent))] transition-transform group-hover:-rotate-6">
            R/
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.02em] text-[rgb(var(--text))] sm:block">Rajeet Ash</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${activeSection === item.id
                ? 'bg-[rgb(var(--accent)_/_0.1)] text-[rgb(var(--accent))]'
                : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]'
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/rajeet-04"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-[rgb(var(--line))] px-3 py-2 text-sm font-semibold text-[rgb(var(--text-muted))] transition-colors hover:border-[rgb(var(--accent)_/_0.6)] hover:text-[rgb(var(--accent))] sm:inline-flex"
          >
            GitHub
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
          {mounted && (
            <motion.button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              whileTap={{ scale: 0.94 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--line))] text-[rgb(var(--text-muted))] transition-colors hover:border-[rgb(var(--accent)_/_0.6)] hover:text-[rgb(var(--accent))]"
              aria-label="Toggle color theme"
            >
              {resolvedTheme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </motion.button>
          )}
        </div>
      </div>

      <nav className="container-shell flex gap-1 overflow-x-auto pb-3 md:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeSection === item.id
              ? 'bg-[rgb(var(--accent)_/_0.14)] text-[rgb(var(--accent))]'
              : 'text-[rgb(var(--text-subtle))] hover:text-[rgb(var(--text))]'
              }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
