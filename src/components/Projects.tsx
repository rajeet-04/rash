'use client'

import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

type Project = {
  number: string
  title: string
  eyebrow: string
  summary: string
  outcome: string
  technologies: string[]
  liveUrl: string
  codeUrl: string
  visual: string
  featured?: boolean
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Vexa',
    eyebrow: 'AI infrastructure / real-time systems',
    summary: 'Meeting transcription infrastructure for humans and AI agents.',
    outcome: 'Connects auto-join bots, real-time WebSocket transcripts, and an MCP server across Google Meet, Microsoft Teams, and Zoom.',
    technologies: ['TypeScript', 'WebSockets', 'MCP', 'AI'],
    liveUrl: 'https://vexa.ai',
    codeUrl: 'https://github.com/rajeet-04/vexa',
    visual: 'visual-vexa',
    featured: true,
  },
  {
    number: '02',
    title: 'JUKES',
    eyebrow: 'Android / product UI',
    summary: 'A premium music experience built around discovery and listening flow.',
    outcome: 'Jetpack Compose app connecting Spotify search and YouTube Music recommendations with streaming, downloads, synced lyrics, and LRU caching.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3'],
    liveUrl: 'https://github.com/rajeet-04/JUKES',
    codeUrl: 'https://github.com/rajeet-04/JUKES',
    visual: 'visual-jukes',
  },
  {
    number: '03',
    title: 'Piik.me',
    eyebrow: 'Analytics / web product',
    summary: 'A real-time UTM link generator and analytics provider.',
    outcome: 'A lightweight product for creating campaign links and seeing the signal behind them without unnecessary complexity.',
    technologies: ['JavaScript', 'Analytics', 'Real-time'],
    liveUrl: 'https://piik.me',
    codeUrl: 'https://github.com/rajeet-04/piik.me',
    visual: 'visual-piik',
  },
  {
    number: '04',
    title: 'BE-PS Algorithm',
    eyebrow: 'Research / renewable energy',
    summary: 'An entropy-guided sorting method for real-time power monitoring.',
    outcome: 'The IEEE AICARE 2025 publication explores faster processing for harmonic distortion monitoring using real-world solar generation data.',
    technologies: ['C++', 'Algorithms', 'Shannon Entropy'],
    liveUrl: 'https://github.com/rajeet-04',
    codeUrl: 'https://github.com/rajeet-04',
    visual: 'visual-research',
  },
]

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual ${project.visual}`} aria-hidden="true">
      <div className="project-visual-grid" />
      <div className="project-window">
        <div className="project-window-top">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="ml-2 font-mono text-[0.62rem] text-white/50">{project.title.toLowerCase().replaceAll(' ', '-')}</span>
        </div>
        <div className="project-window-body">
          <div className="project-window-line medium" />
          <div className="project-window-line short violet" />
          <div className="project-window-line" />
          <div className="project-window-line short" />
        </div>
      </div>
      <span className="absolute bottom-4 left-5 z-10 font-mono text-xs font-semibold tracking-[0.12em] text-white/75">{project.number} / SHIPPED SIGNAL</span>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="container-shell">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow">01 / selected work</p>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="section-title">Things I&apos;ve built, researched, and shipped.</h2>
              <p className="section-copy">A small set of systems and products that show how I think across interfaces, infrastructure, and intelligent software.</p>
            </div>
            <a href="https://github.com/rajeet-04" target="_blank" rel="noopener noreferrer" className="link-arrow shrink-0">
              Browse all repositories <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`surface group overflow-hidden rounded-2xl ${project.featured ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
            >
              <ProjectVisual project={project} />
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mono-label text-[rgb(var(--accent))]">{project.eyebrow}</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--text))] transition-colors group-hover:text-[rgb(var(--accent))]">{project.title}</h3>
                    </div>
                    <span className="mono-label">{project.number}</span>
                  </div>
                  <p className="mt-5 text-base font-medium leading-7 text-[rgb(var(--text))]">{project.summary}</p>
                  <p className="mt-3 text-sm leading-6 text-[rgb(var(--text-muted))]">{project.outcome}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-md border border-[rgb(var(--line)_/_0.8)] bg-[rgb(var(--bg)_/_0.55)] px-2.5 py-1.5 font-mono text-[0.68rem] text-[rgb(var(--text-muted))]">{technology}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 border-t border-[rgb(var(--line)_/_0.7)] pt-5">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    {project.featured ? 'Open product' : 'View project'} <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </a>
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent))]">
                    <CodeBracketIcon className="h-4 w-4" /> Source
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
