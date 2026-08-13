'use client'

import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'

const experiences = [
  {
    type: 'CURRENT ROLE',
    title: 'Software Engineer Intern',
    organization: 'Tautomatic.ai',
    period: 'May 2026 — Present',
    location: 'Remote · USA',
    description: 'Building full-stack and AI backend infrastructure with DevOps, CI/CD pipelines, containerization, and self-healing services.',
    highlights: ['Full-stack', 'AI backend', 'CI/CD', 'Containers'],
  },
  {
    type: 'RESEARCH',
    title: 'Real-Time Power System Monitoring',
    organization: 'IEEE AICARE 2025 Conference',
    period: 'November 2025',
    location: 'Kolkata, India',
    description: 'Authored and presented research introducing the BE-PS algorithm, using entropy-guided sorting to improve data processing for renewable energy grids and harmonic distortion monitoring.',
    highlights: ['BE-PS algorithm', 'Shannon entropy', 'Solar data', 'Publication'],
    link: 'https://github.com/rajeet-04',
  },
  {
    type: 'PRODUCT WORK',
    title: 'Freelance Developer',
    organization: 'Self-employed',
    period: '2024 — Present',
    location: 'Remote',
    description: 'Building web and mobile applications for clients and turning ideas into focused, usable products.',
    highlights: ['10+ projects', 'React / Next.js', 'Kotlin / Android'],
  },
  {
    type: 'OPEN SOURCE',
    title: 'Contributor & Maintainer',
    organization: 'GitHub',
    period: '2023 — Present',
    location: 'Remote',
    description: 'Contributing to open-source projects and maintaining an evolving portfolio of experiments, tools, and product builds.',
    highlights: ['50+ commits', 'Multiple PRs', 'Community'],
    link: 'https://github.com/rajeet-04',
  },
  {
    type: 'EDUCATION',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'IEM Newtown · UEM Kolkata',
    period: '2023 — Present',
    location: 'Kolkata, India',
    description: 'Studying computer science with a focus on AI/ML, full-stack development, and the systems that make software useful at scale.',
    highlights: ['Dean’s List', 'Tech Club Lead', 'Hackathon winner'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="border-y border-[rgb(var(--line)_/_0.5)] py-24 sm:py-32">
      <div className="container-shell grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">03 / experience & proof</p>
          <h2 className="section-title">The trail behind the work.</h2>
          <p className="section-copy">Engineering, research, product work, and open-source contributions across software systems and user-facing products.</p>
          <a href="https://github.com/rajeet-04" target="_blank" rel="noopener noreferrer" className="link-arrow mt-7">
            Follow the trail on GitHub <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="relative pl-7 sm:pl-10">
          <div className="timeline-line" />
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.title}-${experience.period}`}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative flex gap-4"
              >
                <div className="timeline-dot absolute -left-[1.75rem] sm:-left-[2.5rem]" />
                <div className="surface-soft w-full rounded-2xl p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="mono-label text-[rgb(var(--accent))]">{experience.type}</p>
                    <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-[rgb(var(--text))]">{experience.title}</h3>
                  <p className="mt-1 font-medium text-[rgb(var(--accent))]">{experience.organization}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[rgb(var(--text-subtle))]">
                    <span className="inline-flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5" /> {experience.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPinIcon className="h-3.5 w-3.5" /> {experience.location}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--text-muted))]">{experience.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {experience.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-md border border-[rgb(var(--line)_/_0.7)] bg-[rgb(var(--bg)_/_0.45)] px-2.5 py-1.5 font-mono text-[0.68rem] text-[rgb(var(--text-muted))]">{highlight}</span>
                    ))}
                    {experience.link && (
                      <a href={experience.link} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[rgb(var(--accent))] hover:text-[rgb(var(--text))]">
                        Evidence <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
