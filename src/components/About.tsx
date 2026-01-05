'use client'

import { motion } from 'framer-motion'
import { CodeBracketIcon, DevicePhoneMobileIcon, CpuChipIcon, CloudIcon, BeakerIcon, PaintBrushIcon } from '@heroicons/react/24/outline'

export default function About() {
  const skills = [
    { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-400 to-blue-600' },
    { name: 'React/Next.js', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Python', icon: '🐍', color: 'from-green-400 to-green-600' },
    { name: 'Kotlin', icon: '📱', color: 'from-purple-400 to-purple-600' },
    { name: 'Node.js', icon: '🟢', color: 'from-emerald-400 to-emerald-600' },
    { name: 'AI/ML', icon: '🤖', color: 'from-pink-400 to-pink-600' },
    { name: 'Cloud', icon: '☁️', color: 'from-indigo-400 to-indigo-600' },
  ]

  const expertise = [
    {
      icon: CodeBracketIcon,
      title: 'Full-Stack Development',
      desc: 'Building end-to-end web applications with modern frameworks'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile Apps',
      desc: 'Native Android development with Kotlin'
    },
    {
      icon: CpuChipIcon,
      title: 'AI & Machine Learning',
      desc: 'Integrating intelligent solutions into applications'
    },
    {
      icon: CloudIcon,
      title: 'Cloud Architecture',
      desc: 'Designing scalable cloud-native solutions'
    },
    {
      icon: BeakerIcon,
      title: 'Research',
      desc: 'Exploring algorithms for better data handling'
    },
    {
      icon: PaintBrushIcon,
      title: 'UI/UX Design',
      desc: 'Creating intuitive and beautiful interfaces'
    },
  ]

  const stats = [
    { number: '3+', label: 'Years Coding' },
    { number: '15+', label: 'Projects' },
    { number: '8+', label: 'Technologies' },
    { number: '4', label: 'Awards Won' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="terminal-card inline-block mb-6">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">about.md</span>
              </div>
              <div className="terminal-body py-2 px-4">
                <span className="text-[rgb(var(--primary))] text-sm font-mono">cat</span>
                <span className="text-[rgb(var(--muted-foreground))] text-sm font-mono"> ~/about.md</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent-secondary))] mx-auto rounded-full" />
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
            {/* Main Bio Card - spans 4 columns */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-4 midnight-glass-strong p-8"
            >
              <h3 className="text-2xl font-display font-semibold text-[rgb(var(--primary))] mb-4">
                Creative Innovator
              </h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                I'm a 21-year-old B.Tech student majoring in Computer Science Engineering at
                <span className="text-[rgb(var(--foreground))] font-medium"> IEM Newtown</span>,
                under UEM Kolkata. I'm an aspiring innovator with a passion for blending
                creativity with technology.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                My journey involves exploring the intersection of design and development,
                creating digital experiences that not only function flawlessly but also
                captivate and inspire users.
              </p>
            </motion.div>

            {/* Stats Card - spans 2 columns */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 midnight-glass p-6"
            >
              <h3 className="text-lg font-display font-semibold text-[rgb(var(--foreground))] mb-6 text-center">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--primary))] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-[rgb(var(--muted-foreground))]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Card - spans 3 columns */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-3 midnight-glass p-6"
            >
              <h3 className="text-lg font-display font-semibold text-[rgb(var(--foreground))] mb-6">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--muted))] hover:bg-[rgb(var(--secondary))] transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm font-medium text-[rgb(var(--foreground))]">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Expertise Card - spans 3 columns */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-3 midnight-glass p-6"
            >
              <h3 className="text-lg font-display font-semibold text-[rgb(var(--foreground))] mb-6">
                What I Do
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-2 rounded-lg bg-[rgb(var(--primary)_/_0.1)] text-[rgb(var(--primary))]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[rgb(var(--foreground))]">{item.title}</h4>
                      <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}