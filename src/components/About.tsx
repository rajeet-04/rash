'use client'

import { motion } from 'framer-motion'
import { CloudIcon, CodeBracketIcon, CpuChipIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

const capabilities = [
  {
    number: '01',
    icon: CpuChipIcon,
    title: 'AI systems',
    description: 'Building practical AI backends, agent workflows, and real-time intelligence into products.',
  },
  {
    number: '02',
    icon: CodeBracketIcon,
    title: 'Full-stack products',
    description: 'Designing reliable web applications with clean APIs, thoughtful UX, and maintainable architecture.',
  },
  {
    number: '03',
    icon: DevicePhoneMobileIcon,
    title: 'Mobile experiences',
    description: 'Creating focused Android experiences with Kotlin and Jetpack Compose.',
  },
  {
    number: '04',
    icon: CloudIcon,
    title: 'Cloud & infrastructure',
    description: 'Working with CI/CD, containers, deployment systems, and the infrastructure behind the interface.',
  },
]

const technologyGroups = [
  { label: 'Languages', values: ['TypeScript', 'Python', 'Kotlin', 'JavaScript'] },
  { label: 'Product', values: ['React', 'Next.js', 'Node.js', 'Jetpack Compose'] },
  { label: 'Systems', values: ['APIs', 'WebSockets', 'CI/CD', 'Containers'] },
  { label: 'Intelligence', values: ['AI backends', 'ML experiments', 'MCP', 'Research'] },
]

export default function About() {
  return (
    <section id="about" className="border-y border-[rgb(var(--line)_/_0.5)] py-24 sm:py-32">
      <div className="container-shell">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow">02 / the working system</p>
          <h2 className="section-title">Curiosity is my stack.</h2>
          <p className="section-copy">
            I&apos;m a computer science engineer at IEM Newtown who likes moving between the product surface and the systems underneath it. The best work, for me, sits where clear interfaces meet ambitious technical problems.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="surface-soft group rounded-2xl p-5 transition-colors hover:border-[rgb(var(--accent)_/_0.55)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--accent)_/_0.25)] bg-[rgb(var(--accent)_/_0.08)] text-[rgb(var(--accent))]">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="mono-label">{item.number}</span>
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.03em] text-[rgb(var(--text))]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[rgb(var(--text-muted))]">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="surface rounded-2xl p-6 sm:p-8"
          >
            <p className="mono-label text-[rgb(var(--accent))]">HOW I WORK</p>
            <h3 className="mt-5 max-w-sm font-display text-2xl font-semibold tracking-[-0.04em] text-[rgb(var(--text))]">Make the complex feel obvious.</h3>
            <p className="mt-4 text-sm leading-7 text-[rgb(var(--text-muted))]">
              I start with the user problem, make the system legible, then ship in small feedback loops. I care about the details that make software feel calm: sensible defaults, fast feedback, and interfaces that explain themselves.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[rgb(var(--line)_/_0.7)] pt-5 text-center">
              <div><p className="font-display text-2xl font-semibold text-[rgb(var(--accent))]">15+</p><p className="mono-label mt-1">projects</p></div>
              <div><p className="font-display text-2xl font-semibold text-[rgb(var(--accent))]">4</p><p className="mono-label mt-1">awards</p></div>
              <div><p className="font-display text-2xl font-semibold text-[rgb(var(--accent))]">1</p><p className="mono-label mt-1">publication</p></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="surface-soft rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="mono-label text-[rgb(var(--accent))]">TOOLCHAIN</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-[rgb(var(--text))]">The tools behind the work.</h3>
              </div>
              <span className="hidden rounded-md border border-[rgb(var(--line))] px-2 py-1 font-mono text-xs text-[rgb(var(--text-subtle))] sm:block">stack.json</span>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {technologyGroups.map((group) => (
                <div key={group.label}>
                  <p className="mono-label">{group.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.values.map((value) => (
                      <span key={value} className="rounded-md border border-[rgb(var(--line)_/_0.8)] bg-[rgb(var(--bg)_/_0.55)] px-2.5 py-1.5 text-xs font-medium text-[rgb(var(--text-muted))] transition-colors hover:border-[rgb(var(--accent)_/_0.5)] hover:text-[rgb(var(--accent))]">{value}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
