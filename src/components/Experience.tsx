'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, MapPinIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const experiences = [
    {
      id: 1,
      title: 'B.Tech Computer Science Engineering',
      company: 'IEM Newtown (UEM Kolkata)',
      period: '2024 - Present',
      location: 'Kolkata, India',
      type: 'education',
      description: 'Pursuing Bachelor of Technology in Computer Science Engineering with focus on AI, web development, and software engineering.',
      achievements: [
        'First place in AI Synthetic Genomics poster presentation',
        'Active participation in coding competitions',
        'Leading various technical projects',
      ],
    },
    {
      id: 2,
      title: 'Research Project',
      company: 'AI in Synthetic Genomics',
      period: '2024',
      location: 'UEMK',
      type: 'research',
      description: 'Led research on applications of artificial intelligence in synthetic genomics, resulting in award-winning presentation.',
      achievements: [
        'First place in university competition',
        'Comprehensive research methodology',
        'Innovative AI applications in genomics',
      ],
    },
     {
     id: 4,
  title: 'Real-Time Power System Monitoring (BE-PS Algorithm)',
  company: 'IEEE AICARE 2025 Conference',
  period: 'Nov 2025',
  location: 'Kolkata, India',
  type: 'publication',
  description: 'Authored and presented a research paper introducing the BE-PS (Binary Entropy-Poly Split) algorithm. This entropy-guided sorting method is designed to optimize data processing for renewable energy grids, significantly outperforming traditional algorithms like Quicksort and std::sort.',
  achievements: [
    'Developed the BE-PS algorithm, achieving 2x-3x faster execution than optimized C++ libraries on clustered datasets.',
    'Presented at the 1st International Conference on AI for Computing, Astronomy, and Renewable Energy (AICARE 2025).',
    'Applied information-theoretic principles (Shannon Entropy) to optimize real-time harmonic distortion (THD) monitoring.',
    'Benchmarked performance against standard algorithms using real-world solar generation data.'
  ],
},
    {
      id: 3,
      title: 'Web Development Projects',
      company: 'Freelance & Personal',
      period: '2023 - Present',
      location: 'Remote',
      type: 'work',
      description: 'Developing modern web applications with focus on user experience, performance, and innovative design.',
      achievements: [
        'Built 10+ responsive websites',
        'Mastered modern web technologies',
        'Implemented complex animations and effects',
      ],
    },
  ]

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-500'
      case 'research':
        return 'bg-green-500'
      case 'publication':
        return 'bg-purple-500'
      case 'work':
        return 'bg-primary-500'
      default:
        return 'bg-primary-500'
    }
  }

  return (
    <section id="experience" className="py-20 px-6 min-h-[60vh] mt-6 sm:mt-0">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // Use consistent viewport settings that work well on all devices
          viewport={{ once: true, amount: 0.05, margin: "100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-departure font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mb-4">
              Experience & Education
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
            <p className="text-text-tertiary text-lg max-w-2xl mx-auto">
              My academic journey and professional experiences shaping my growth as a developer
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative flex items-start space-x-6"
                  // Add explicit animations for mobile to ensure visibility
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ 
                    duration: isMobile ? 0.5 : 0.8, 
                    delay: isMobile ? index * 0.1 : index * 0.2 
                  }}
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${getTypeColor(exp.type)} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      <AcademicCapIcon className="w-6 h-6" />
                    </div>
                  </div>

                  <motion.div
                    className="flex-1 glass-effect rounded-2xl p-6 neon-border"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-space font-semibold text-foreground mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <div className="flex items-center text-text-tertiary text-sm mb-1">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-text-tertiary text-sm">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-text-secondary text-sm flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
