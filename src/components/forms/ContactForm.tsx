'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(20, 'Please describe your challenge (min 20 characters)'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us directly at hello@quantumatlas.ai')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: '#00E5A015', color: '#00E5A0' }}
        >
          ✓
        </div>
        <h3 className="text-text-primary text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Request received
        </h3>
        <p className="text-text-secondary text-sm">
          We will be in touch within 24 hours to schedule your call.
        </p>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
  const labelClass = "block text-text-secondary text-xs mb-1.5 font-medium uppercase tracking-wide"
  const errorClass = "text-red-400 text-xs mt-1"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input {...register('name')} placeholder="Your name" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Company</label>
          <input {...register('company')} placeholder="Company name" className={inputClass} />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Work Email</label>
          <input {...register('email')} type="email" placeholder="you@company.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone (optional)</label>
          <input {...register('phone')} placeholder="+91..." className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Service Interested In</label>
        <select {...register('service')} className={inputClass} defaultValue="">
          <option value="" disabled>Select a service...</option>
          <option value="voice-ai">AI Voice Agents</option>
          <option value="idp">Document Intelligence</option>
          <option value="rag">Enterprise RAG</option>
          <option value="saas">Custom SaaS Development</option>
          <option value="automation">AI Automation</option>
          <option value="content">Content &amp; Video</option>
          <option value="unsure">Not sure — tell us more</option>
        </select>
        {errors.service && <p className={errorClass}>{errors.service.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Describe Your Challenge</label>
        <textarea
          {...register('message')}
          placeholder="What problem are you trying to solve? What have you tried so far?"
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all disabled:opacity-70 text-sm"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {submitting ? 'Submitting...' : 'Request a Discovery Call'}
      </button>

      <p className="text-text-secondary text-xs text-center">
        We respond within 24 hours. No spam. No obligation.
      </p>
    </form>
  )
}
