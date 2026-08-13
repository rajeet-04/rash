'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon, ArrowTopRightOnSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const focusAreas = [
  { label: 'AI systems', value: '███████' },
  { label: 'Full-stack', value: '██████' },
  { label: 'Mobile', value: '████' },
  { label: 'Research', value: '█████' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-28">
      <div className="container-shell grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--success)_/_0.28)] bg-[rgb(var(--success)_/_0.08)] px-3 py-1.5 text-sm font-medium text-[rgb(var(--success))]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[rgb(var(--success))]" />
            Available for meaningful work
          </div>

          <p className="eyebrow">Software engineer · builder · researcher</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.25rem,9vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[rgb(var(--text))]">
            Rajeet <span className="text-[rgb(var(--accent))]">Ash.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-[clamp(1.55rem,3vw,2.45rem)] font-medium leading-tight tracking-[-0.04em] text-[rgb(var(--text-muted))]">
            I build AI systems, developer tools, and digital products that are useful beyond the demo.
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-[rgb(var(--text-muted))] sm:text-lg">
            I work across TypeScript, Python, Kotlin, and cloud infrastructure to turn complex ideas into reliable software and clear user experiences.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="button-primary">
              View selected work
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            <a href="https://github.com/rajeet-04" target="_blank" rel="noopener noreferrer" className="button-secondary">
              GitHub
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
            <a href="#contact" className="button-ghost">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[rgb(var(--text-subtle))]">
            <span className="inline-flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-[rgb(var(--accent))]" /> Kolkata · UTC+5:30</span>
            <span className="inline-flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-[rgb(var(--accent))]" /> TypeScript · Python · Kotlin</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="surface relative overflow-hidden rounded-2xl p-5 sm:p-7"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[rgb(var(--accent)_/_0.12)] blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between border-b border-[rgb(var(--line)_/_0.7)] pb-4">
              <div>
                <p className="mono-label text-[rgb(var(--accent))]">SYSTEM SNAPSHOT</p>
                <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">What I&apos;m building around</p>
              </div>
              <span className="rounded-md border border-[rgb(var(--accent)_/_0.35)] px-2 py-1 font-mono text-[0.65rem] text-[rgb(var(--accent))]">v2026.08</span>
            </div>

            <div className="mt-7 space-y-5">
              {focusAreas.map((area, index) => (
                <div key={area.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-[rgb(var(--text-muted))]">{area.label}</span>
                    <span className={index % 2 === 0 ? 'font-mono text-[rgb(var(--accent))]' : 'font-mono text-[rgb(var(--violet))]'}>{area.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[rgb(var(--line)_/_0.65)]">
                    <div className={index % 2 === 0 ? 'h-full rounded-full bg-[rgb(var(--accent))]' : 'h-full rounded-full bg-[rgb(var(--violet))]'} style={{ width: `${[92, 78, 56, 68][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[rgb(var(--line)_/_0.7)] pt-5">
              <div className="surface-soft rounded-xl p-3">
                <p className="mono-label">CURRENTLY</p>
                <p className="mt-1 text-sm font-semibold text-[rgb(var(--text))]">Shipping at Tautomatic.ai</p>
              </div>
              <div className="surface-soft rounded-xl p-3">
                <p className="mono-label">RECENT SIGNAL</p>
                <p className="mt-1 text-sm font-semibold text-[rgb(var(--text))]">IEEE AICARE 2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#work" className="container-shell mt-20 flex items-center gap-3 text-sm text-[rgb(var(--text-subtle))] transition-colors hover:text-[rgb(var(--accent))]" aria-label="Scroll to selected work">
        <span className="h-px w-10 bg-[rgb(var(--line))]" />
        Scroll to explore
        <ArrowDownIcon className="h-4 w-4" />
      </a>
    </section>
  )
}
