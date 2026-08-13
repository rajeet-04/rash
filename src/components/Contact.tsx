'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { ArrowTopRightOnSquareIcon, CheckCircleIcon, EnvelopeIcon, MapPinIcon, PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/outline'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: 'New portfolio message',
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      )
      setFormData({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-shell">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow">04 / start a conversation</p>
          <h2 className="section-title max-w-3xl">Let&apos;s build something useful.</h2>
          <p className="section-copy">Have a product, AI system, or developer tool in mind? Send a message or find me in the places where I build in public.</p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={handleSubmit}
            className="surface rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mono-label">YOUR NAME</span>
                <input className="input-field mt-2" type="text" name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Jane Doe" required />
              </label>
              <label className="block">
                <span className="mono-label">EMAIL</span>
                <input className="input-field mt-2" type="email" name="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="jane@example.com" required />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mono-label">MESSAGE</span>
              <textarea className="input-field mt-2 min-h-40 resize-y" name="message" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="Tell me what you are building..." required />
            </label>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="button-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message sent' : status === 'error' ? 'Try again' : 'Send message'}
                {status === 'success' ? <CheckCircleIcon className="h-4 w-4" /> : status === 'error' ? <XCircleIcon className="h-4 w-4" /> : <PaperAirplaneIcon className="h-4 w-4" />}
              </button>
              <p className="text-xs text-[rgb(var(--text-subtle))]">I usually reply within a few days.</p>
            </div>
          </motion.form>

          <motion.aside initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="space-y-5">
            <div className="surface-soft rounded-2xl p-6 sm:p-8">
              <p className="mono-label text-[rgb(var(--accent))]">DIRECT LINE</p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-[rgb(var(--text))]">Prefer email?</h3>
              <p className="mt-3 text-sm leading-6 text-[rgb(var(--text-muted))]">For project conversations, collaborations, or just a good technical question.</p>
              <a href="mailto:rajeetash@hotmail.com" className="mt-6 inline-flex items-center gap-2 font-semibold text-[rgb(var(--accent))] hover:text-[rgb(var(--text))]">
                <EnvelopeIcon className="h-5 w-5" /> rajeetash@hotmail.com
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="surface-soft rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-[rgb(var(--accent))]" />
                  <div><p className="mono-label">BASED IN</p><p className="mt-1 text-sm font-medium text-[rgb(var(--text))]">Kolkata, India</p></div>
                </div>
              </div>
              <div className="surface-soft rounded-2xl p-6">
                <p className="mono-label">FIND ME ONLINE</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                  <a href="https://github.com/rajeet-04" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent))]">GitHub <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" /></a>
                  <a href="https://www.linkedin.com/in/rajeet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent))]">LinkedIn <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" /></a>
                  <a href="https://x.com/RajeetAsh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent))]">X <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
