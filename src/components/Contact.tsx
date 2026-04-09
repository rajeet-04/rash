'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/rajeet-04', icon: '⌨️' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rajeet', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/RajeetAsh', icon: '🐦' },
    { name: 'Email', url: 'mailto:rajeetash@hotmail.com', icon: '📧' },
  ]

  return (
    <section id="contact" className="py-20 px-4 md:px-6">
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
              <span className="terminal-title">contact.sh</span>
            </div>
            <div className="terminal-body py-2 px-4">
              <span className="text-[rgb(var(--primary))] text-sm font-mono">./</span>
              <span className="text-[rgb(var(--muted-foreground))] text-sm font-mono">send-message.sh</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="midnight-glass-strong p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Sent Successfully!
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircleIcon className="w-5 h-5" />
                    Failed. Try Again
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            {/* Location Card */}
            <div className="midnight-glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[rgb(var(--primary)_/_0.1)] text-[rgb(var(--primary))]">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[rgb(var(--foreground))]">Location</h3>
              </div>
              <p className="text-[rgb(var(--muted-foreground))] text-sm">
                Kolkata, West Bengal<br />India
              </p>
            </div>

            {/* Email Card */}
            <div className="midnight-glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[rgb(var(--primary)_/_0.1)] text-[rgb(var(--primary))]">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-[rgb(var(--foreground))]">Email</h3>
              </div>
              <a href="mailto:rajeetash@hotmail.com" className="text-[rgb(var(--primary))] text-sm hover:underline">
                rajeetash@hotmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="midnight-glass p-6">
              <h3 className="font-display font-semibold text-[rgb(var(--foreground))] mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[rgb(var(--muted))] hover:bg-[rgb(var(--primary)_/_0.1)] text-xl transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
