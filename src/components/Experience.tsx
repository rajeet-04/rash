'use client'

import { motion } from 'framer-motion'
import { CalendarIcon, MapPinIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Experience() {
  const experiences = [
    {
      type: 'education',
      title: 'B.Tech in Computer Science Engineering',
      organization: 'IEM Newtown (UEM Kolkata)',
      location: 'Kolkata, India',
      period: '2023 - Present',
      description: 'Pursuing B.Tech in CSE with focus on AI/ML and full-stack development.',
      highlights: ['Dean\'s List', 'Tech Club Lead', 'Hackathon Winner']
    },
    {
      type: 'work',
      title: 'Freelance Developer',
      organization: 'Self-Employed',
      location: 'Remote',
      period: '2024 - Present',
      description: 'Building web and mobile applications for clients worldwide.',
      highlights: ['10+ Projects', 'React/Next.js', 'Kotlin/Android']
    },
    {
      type: 'work',
      title: 'Open Source Contributor',
      organization: 'GitHub',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Contributing to various open-source projects and maintaining my own.',
      highlights: ['50+ Commits', 'Multiple PRs', 'Community Building']
    },
    {
      title: 'Real-Time Power System Monitoring (BE-PS Algorithm)',
      organization: 'IEEE AICARE 2025 Conference',
      period: 'Nov 2025',
      location: 'Kolkata, India',
      type: 'publication',
      description: 'Authored and presented a research paper introducing the BE-PS (Binary Entropy-Poly Split) algorithm. This entropy-guided sorting method is designed to optimize data processing for renewable energy grids, significantly outperforming traditional algorithms like Quicksort and std::sort.',
      highlights: [
        'Developed the BE-PS algorithm, achieving 2x-3x faster execution than optimized C++ libraries on clustered datasets.',
        'Presented at the 1st International Conference on AI for Computing, Astronomy, and Renewable Energy (AICARE 2025).',
        'Applied information-theoretic principles (Shannon Entropy) to optimize real-time harmonic distortion (THD) monitoring.',
        'Benchmarked performance against standard algorithms using real-world solar generation data.'
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="terminal-card inline-block mb-6">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">experience.log</span>
            </div>
            <div className="terminal-body py-2 px-4">
              <span className="text-[rgb(var(--primary))] text-sm font-mono">git</span>
              <span className="text-[rgb(var(--muted-foreground))] text-sm font-mono"> log --oneline</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Experience
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
            My journey in tech - education, work, and contributions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--primary))] via-[rgb(var(--border))] to-[rgb(var(--border))]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[rgb(var(--primary))] ring-4 ring-[rgb(var(--background))] z-10" />

              {/* Content Card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="midnight-glass p-6 hover-lift">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded-lg ${exp.type === 'education' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                      {exp.type === 'education' ? (
                        <AcademicCapIcon className="w-4 h-4" />
                      ) : (
                        <BriefcaseIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-[rgb(var(--foreground))] mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-[rgb(var(--primary))] font-medium text-sm mb-2">
                    {exp.organization}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-[rgb(var(--muted-foreground))] mb-3">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-mono bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
