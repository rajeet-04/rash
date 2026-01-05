'use client'

import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { name: 'GitHub', url: 'https://github.com/rajeet-04' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rajeet' },
    { name: 'Twitter', url: 'https://twitter.com/rajeet' },
  ]

  return (
    <footer className="py-16 px-4 md:px-6 border-t border-[rgb(var(--border)_/_0.3)] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* ASCII Art Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            className="font-mono text-[8px] sm:text-xs md:text-sm text-[rgb(var(--primary))] text-center leading-tight whitespace-pre select-none"
            animate={{
              textShadow: [
                '0 0 10px rgb(var(--primary) / 0.5)',
                '0 0 20px rgb(var(--primary) / 0.7)',
                '0 0 10px rgb(var(--primary) / 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div>{'╔══════════════════════════════════════╗'}</div>
            <div>{'║  ███╗   ███╗███████╗███████╗██╗  ██╗ ║'}</div>
            <div>{'║  ████╗ ████║██╔════╝██╔════╝██║ ██╔╝ ║'}</div>
            <div>{'║  ██╔████╔██║█████╗  █████╗  █████╔╝  ║'}</div>
            <div>{'║  ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔═██╗  ║'}</div>
            <div>{'║  ██║ ╚═╝ ██║███████╗███████╗██║  ██╗ ║'}</div>
            <div>{'║  ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ║'}</div>
            <div>{'╚══════════════════════════════════════╝'}</div>
          </motion.div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-8 mb-8"
        >
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--primary)_/_0.3)] to-transparent mb-8" />

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[rgb(var(--muted-foreground))]"
        >
          <div className="flex items-center gap-1">
            <span>© {currentYear} Rajeet Ash</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartIcon className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>in Kolkata</span>
          </div>

          <motion.div
            className="flex items-center gap-2 text-[rgb(var(--primary))]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-mono">System Online</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}