'use client'

import { motion } from 'framer-motion'

export default function About() {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React/Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'GSAP/Animations', level: 85 },
    { name: 'AI/Machine Learning', level: 70 },
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

  return (
    <section id="about" className="fade-in-section py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-dynapuff font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                className="glass-effect rounded-2xl p-8 neon-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 className="text-2xl font-dynapuff font-semibold mb-4 text-primary-400">
                  Creative Innovator
                </h3>
                <p className="text-text-tertiary leading-relaxed mb-4">
                  I'm a 20-year-old B.Tech student majoring in Computer Science Engineering at IEM Newtown, 
                  under UEM Kolkata. I'm an aspiring innovator with a passion for blending creativity with technology.
                </p>
                <p className="text-text-tertiary leading-relaxed">
                  My journey involves exploring the intersection of design and development, creating digital 
                  experiences that not only function flawlessly but also captivate and inspire users.
                </p>
              </motion.div>

              <motion.div
                className="glass-effect rounded-2xl p-8 neon-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 className="text-2xl font-dynapuff font-semibold mb-4 text-primary-400">
                  What I Do
                </h3>
                <ul className="space-y-2 text-text-tertiary">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    Full-stack web development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    Interactive UI/UX design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    Research in Algoritms for Better Data Handling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    Modern web animations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    Build Native and Hybris Apps 
                  </li> 
                </ul>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-2xl p-8 neon-border">
                <h3 className="text-2xl font-dynapuff font-semibold mb-8 text-primary-400">
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-primary-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '2+', label: 'Years Coding' },
              { number: '10+', label: 'Projects' },
              { number: '5+', label: 'Technologies' },
              { number: '1', label: 'Award Won' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center glass-effect rounded-2xl p-6 hover-glow"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-dynapuff font-bold text-primary-400 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-text-tertiary text-sm font-arima">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}