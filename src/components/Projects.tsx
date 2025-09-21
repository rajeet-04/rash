'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'AI in Synthetic Genomics',
      description: 'Research poster on applications of artificial intelligence in synthetic genomics that won first place at UEMK.',
      image: '/UEM-Logo.png',
      category: 'research',
      technologies: ['AI', 'Genomics', 'Research', 'Python'],
      liveUrl: '#',
      codeUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with stunning animations, GSAP effects, and smooth interactions.',
      image: '/r.jpeg',
      category: 'web',
      technologies: ['Next.js', 'GSAP', 'Anime.js', 'TypeScript'],
      liveUrl: '#',
      codeUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Interactive Dashboard',
      description: 'Data visualization dashboard with real-time analytics and interactive charts.',
      image: '/git.png',
      category: 'web',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      codeUrl: '#',
      featured: false,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Dev' },
    { id: 'research', name: 'Research' },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="projects" className="fade-in-section py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-dynapuff font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mb-4">
              My Projects
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of my work showcasing creativity, technical skills, and innovation
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="glass-effect rounded-full p-2 neon-border">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-primary-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group relative glass-effect rounded-2xl overflow-hidden neon-border hover-glow"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={project.liveUrl}
                        className="p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.codeUrl}
                        className="p-2 bg-dark-700 rounded-full text-white hover:bg-dark-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                      </motion.a>
                    </div>

                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-dynapuff font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-dark-700 text-primary-400 text-xs rounded-full border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={project.liveUrl}
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors font-medium"
                      whileHover={{ x: 5 }}
                    >
                      View Project
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}