'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Manually force re-render after filtering to ensure proper layout calculation
  const [forceUpdate, setForceUpdate] = useState(0)
  
  useEffect(() => {
    // Force a re-render after filter changes to ensure proper layout
    setForceUpdate(prev => prev + 1)
    
    // Dispatch events to help other components know that layout has changed
    const notifyLayoutChange = () => {
      // Use resize event as it's commonly listened to for layout changes
      window.dispatchEvent(new Event('resize', { bubbles: true }))
    }
    
    // Schedule notifications at different intervals to catch all layout changes
    const timer1 = setTimeout(notifyLayoutChange, 50)
    const timer2 = setTimeout(notifyLayoutChange, 300) 
    const timer3 = setTimeout(notifyLayoutChange, 600)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [selectedCategory])

  const projects = [
    {
      id: 'classroom-management',
      title: 'Classroom Management System',
      description: 'A comprehensive full-stack web application for managing university courses, assignments, and student submissions. Built with React frontend and Flask backend.',
      image: '/classroom-preview.jpg',
      category: 'fullstack',
      technologies: ['React', 'Flask', 'SQLite', 'TailwindCSS', 'JWT', 'Celery'],
      liveUrl: '#',
      codeUrl: '#',
      featured: true,
      stars: 0,
      forks: 0,
      language: 'Python',
      status: 'Private Repository',
      isPublic: false
    },
    {
      id: 'musox',
      title: 'Musox',
      description: 'Advanced music application with real-time features and modern UI design.',
      image: '/musox-preview.jpg',
      category: 'web', 
      technologies: ['Python', 'Flask', 'JavaScript'],
      liveUrl: 'https://github.com/rajeet-04/musox',
      codeUrl: 'https://github.com/rajeet-04/musox',
      featured: true,
      stars: 2,
      forks: 1,
      language: 'Python',
      status: 'Active',
      isPublic: true
    },
    {
      id: 'e2eclipse',
      title: 'E2Eclipse',
      description: 'Modern Android application built with Kotlin for enhanced user experience.',
      image: '/e2eclipse-preview.jpg',
      category: 'mobile',
      technologies: ['Kotlin', 'Android'],
      liveUrl: 'https://github.com/rajeet-04/E2Eclipse',
      codeUrl: 'https://github.com/rajeet-04/E2Eclipse',
      featured: true,
      stars: 3,
      forks: 0,
      language: 'Kotlin',
      status: 'Active',
      isPublic: true
    },
    {
      id: 'gistify',
      title: 'Gistify',
      description: 'An AI powered webpage summarizer that helps users quickly understand web content.',
      image: '/gistify-preview.jpg',
      category: 'ai',
      technologies: ['JavaScript', 'AI', 'Web APIs'],
      liveUrl: 'https://gistify-psi.vercel.app',
      codeUrl: 'https://github.com/rajeet-04/gistify',
      featured: false,
      stars: 0,
      forks: 0,
      language: 'JavaScript',
      status: 'Live',
      isPublic: true
    },
    {
      id: 'rag',
      title: 'RAG System',
      description: 'Retrieval-Augmented Generation system for enhanced AI responses with context.',
      image: '/rag-preview.jpg',
      category: 'ai',
      technologies: ['Python', 'AI', 'Machine Learning'],
      liveUrl: 'https://github.com/rajeet-04/rag',
      codeUrl: 'https://github.com/rajeet-04/rag',
      featured: false,
      stars: 1,
      forks: 1,
      language: 'Python',
      status: 'Active',
      isPublic: true
    },
    {
      id: 'offline-file-transfer',
      title: 'Offline File Transfer',
      description: 'Peer-to-peer file transfer application for local network sharing.',
      image: '/file-transfer-preview.jpg',
      category: 'utility',
      technologies: ['JavaScript', 'Node.js', 'WebRTC'],
      liveUrl: 'https://github.com/rajeet-04/OFFLINE_FILE_TRANSFER',
      codeUrl: 'https://github.com/rajeet-04/OFFLINE_FILE_TRANSFER',
      featured: false,
      stars: 1,
      forks: 2,
      language: 'JavaScript',
      status: 'Active',
      isPublic: true
    },
    {
      id: 'sync-video',
      title: 'Sync Video Platform',
      description: 'Real-time video synchronization platform for watching content together.',
      image: '/sync-video-preview.jpg',
      category: 'web',
      technologies: ['JavaScript', 'React', 'Socket.io', 'Node.js'],
      liveUrl: 'https://github.com/rajeet-04/sync-video-frontend',
      codeUrl: 'https://github.com/rajeet-04/sync-video-frontend',
      featured: false,
      stars: 0,
      forks: 0,
      language: 'JavaScript',
      status: 'Live',
      isPublic: true
    },
    {
      id: 'dti',
      title: 'DTI Analysis',
      description: 'Data analysis and visualization tool for DTI research applications.',
      image: '/dti-preview.jpg',
      category: 'research',
      technologies: ['Python', 'Data Science', 'Analysis'],
      liveUrl: 'https://github.com/rajeet-04/dti',
      codeUrl: 'https://github.com/rajeet-04/dti',
      featured: false,
      stars: 0,
      forks: 0,
      language: 'Python',
      status: 'Research',
      isPublic: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'ai', name: 'AI & ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'mobile', name: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'utility', name: 'Utilities', count: projects.filter(p => p.category === 'utility').length },
    { id: 'research', name: 'Research', count: projects.filter(p => p.category === 'research').length },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="projects" className="py-12 md:py-20 px-4 md:px-6 bg-background min-h-screen w-full overflow-hidden transition-all duration-500 ease-out">
      <div className="container mx-auto max-w-7xl w-full">
        <motion.div
          key={`projects-wrapper-${selectedCategory}-${forceUpdate}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Use animate instead of whileInView to ensure visibility
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Featured Work
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-6">
              My Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/80 mx-auto rounded-full mb-8" />
            <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
              A curated collection of projects that demonstrate my expertise in full-stack development, 
              AI/ML, mobile applications, and innovative solutions to real-world problems.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mb-16">
            <div className="glass-effect-strong rounded-2xl p-2 md:p-3 border border-border w-full max-w-4xl">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-text-secondary hover:text-primary hover:bg-muted'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{category.name}</span>
                    {category.count > 0 && (
                      <span className={`ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-text-tertiary'
                      }`}>
                        {category.count}
                      </span>
                    )}
                    {selectedCategory === category.id && (
                      <motion.div
                        layoutId="categoryBackground"
                        className="absolute inset-0 bg-primary rounded-xl -z-10"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <div
            key={`grid-${selectedCategory}-${forceUpdate}`}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 min-h-[420px] sm:min-h-[500px] md:min-h-[600px] transition-all duration-500"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${selectedCategory}-${project.id}-${forceUpdate}`}
                  variants={itemVariants}
                  // Use direct animation props that will always work
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ 
                    duration: isMobile ? 0.3 : 0.5,
                    delay: isMobile ? index * 0.02 : index * 0.05,
                    ease: "easeOut"
                  }}
                  className="group relative glass-effect rounded-2xl overflow-hidden border border-border hover-lift hover:border-primary/50 w-full"
                  whileHover={!isMobile ? { y: -4 } : {}}
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                    {/* Project Preview Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-primary/20 opacity-50">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action Buttons */}
                    {project.isPublic !== false && (
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <motion.a
                          href={project.liveUrl}
                          className="p-2.5 bg-background/90 backdrop-blur-sm rounded-lg text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Live"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.codeUrl}
                          className="p-2.5 bg-background/90 backdrop-blur-sm rounded-lg text-text-secondary hover:bg-secondary hover:text-foreground transition-colors shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Code"
                        >
                          <CodeBracketIcon className="w-4 h-4" />
                        </motion.a>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold rounded-full shadow-lg">
                          <StarIcon className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2.5 py-1 bg-background/90 backdrop-blur-sm text-text-secondary text-xs font-medium rounded-md">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-text-tertiary text-sm flex-shrink-0">
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3 h-3" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-xs">{project.language}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 md:px-2.5 py-1 bg-muted text-text-secondary text-xs font-medium rounded-md border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 md:px-2.5 py-1 text-text-tertiary text-xs">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {project.isPublic !== false ? (
                        <motion.a
                          href={project.liveUrl}
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                          whileHover={{ x: 2 }}
                        >
                          View Project
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                        </motion.a>
                      ) : (
                        <div className="text-text-tertiary text-sm italic">Private Project</div>
                      )}

                      {project.forks > 0 && (
                        <div className="text-text-tertiary text-xs">
                          {project.forks} fork{project.forks !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}