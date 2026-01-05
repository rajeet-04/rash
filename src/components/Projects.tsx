'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, StarIcon } from '@heroicons/react/24/outline'
import reposData from '../../public/repos.json'

interface RepoData {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  liveUrl: string
  codeUrl: string
  stars: number
  forks: number
  language: string
  lastUpdated: string
  isPublic: boolean
  featured: boolean
  status: string
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const projects: RepoData[] = reposData as RepoData[]

  const categorySet = new Set(projects.map(p => p.category))
  const categories = [
    { id: 'all', name: 'All', count: projects.length },
    ...Array.from(categorySet).map(cat => ({
      id: cat,
      name: cat === 'ai' ? 'AI & ML' :
        cat === 'fullstack' ? 'Full Stack' :
          cat === 'web' ? 'Web' :
            cat === 'mobile' ? 'Mobile' :
              cat === 'utility' ? 'Tools' :
                cat === 'research' ? 'Research' :
                  cat.charAt(0).toUpperCase() + cat.slice(1),
      count: projects.filter(p => p.category === cat).length
    }))
  ].filter(cat => cat.count > 0)

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 px-4 md:px-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="terminal-card inline-block mb-6">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">projects.json</span>
            </div>
            <div className="terminal-body py-2 px-4">
              <span className="text-[rgb(var(--primary))] text-sm font-mono">ls</span>
              <span className="text-[rgb(var(--muted-foreground))] text-sm font-mono"> ~/projects/</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            My Projects
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            A collection of projects showcasing my work in full-stack development,
            AI/ML, mobile apps, and more.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="midnight-glass p-2 inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] neon-glow'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name}
                <span className={`ml-2 text-xs ${selectedCategory === category.id
                    ? 'text-[rgb(var(--primary-foreground)_/_0.7)]'
                    : 'text-[rgb(var(--muted-foreground))]'
                  }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="midnight-glass h-full overflow-hidden hover-lift">
                  {/* Card Header - Terminal Style */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgb(var(--border)_/_0.5)]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-mono text-[rgb(var(--muted-foreground))] ml-2 truncate">
                      {project.id}
                    </span>
                    {project.featured && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-[rgb(var(--primary))]">
                        <StarIcon className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-display font-semibold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[rgb(var(--muted-foreground))] text-sm">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4" />
                            {project.stars}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono bg-[rgb(var(--muted))] text-[rgb(var(--primary))] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-[rgb(var(--muted-foreground))]">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Language & Status */}
                    <div className="flex items-center justify-between text-xs text-[rgb(var(--muted-foreground))]">
                      {project.language && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[rgb(var(--primary))]" />
                          {project.language}
                        </div>
                      )}
                      <span className="px-2 py-0.5 bg-[rgb(var(--muted))] rounded text-[10px] uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer - Actions */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-[rgb(var(--border)_/_0.5)] bg-[rgb(var(--muted)_/_0.3)]">
                    {project.isPublic ? (
                      <>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[rgb(var(--primary))] hover:text-[rgb(var(--foreground))] transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          <EyeIcon className="w-4 h-4" />
                          View
                        </motion.a>
                        <motion.a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          <CodeBracketIcon className="w-4 h-4" />
                          Code
                        </motion.a>
                      </>
                    ) : (
                      <span className="text-sm text-[rgb(var(--muted-foreground))] italic">
                        Private Repository
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}