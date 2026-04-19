'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Mic2, FileText, Brain, Code2, Workflow, Video } from 'lucide-react'

const services = [
  {
    icon: Mic2,
    name: 'AI Voice Agents',
    description: 'Self-hosted inbound and outbound voice agents with Airtel/Jio native integration.',
    metric: '$0.08/min · 4 months production',
    href: '/services/ai-voice-agents',
    color: '#FFBF00',
  },
  {
    icon: FileText,
    name: 'Document Intelligence',
    description: 'Bulk document processing pipeline — hundreds of documents in minutes.',
    metric: '$0.08/page · 10x faster processing',
    href: '/services/document-intelligence',
    color: '#00E5A0',
  },
  {
    icon: Brain,
    name: 'Enterprise RAG',
    description: 'Hybrid retrieval knowledge systems with citations on every answer.',
    metric: 'Government-grade · On-premise ready',
    href: '/services/enterprise-rag',
    color: '#A855F7',
  },
  {
    icon: Code2,
    name: 'Custom SaaS Development',
    description: 'Full multi-tenant SaaS platforms built from scratch. No templates.',
    metric: 'Production-ready · Multi-tenant',
    href: '/services/saas-development',
    color: '#FFBF00',
  },
  {
    icon: Workflow,
    name: 'AI Automation',
    description: 'LangGraph + n8n orchestration for complex enterprise workflows.',
    metric: '15-person team reduced to 2 · Proven',
    href: '/services/ai-automation',
    color: '#00E5A0',
  },
  {
    icon: Video,
    name: 'Content & Video',
    description: 'ComfyUI-powered avatars, lipsync, and enterprise video production.',
    metric: 'ComfyUI · Tavus · One vendor',
    href: '/services/content-video',
    color: '#A855F7',
  },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 70, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

export function ServicesGrid() {
  return (
    <section className="relative py-24 px-6 lg:px-8" style={{ background: '#12100D' }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(currentcolor 1px, transparent 1px), linear-gradient(90deg, currentcolor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p
          className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Our Services
        </p>
        <h2
          className="text-4xl font-bold text-text-primary mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The full stack. Under one roof.
        </h2>
        <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
          One partner for voice AI, document intelligence, RAG systems, and custom SaaS —
          so you never need a second vendor.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {services.map((svc) => {
          const Icon = svc.icon
          return (
            <motion.div key={svc.href} variants={item}>
              <Link
                href={svc.href}
                className="group flex flex-col h-full p-6 rounded-xl border border-space-border hover:-translate-y-1 hover:border-opacity-80 transition-all duration-300"
                style={{
                  background: '#171411',
                  borderTop: `3px solid ${svc.color}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={22} style={{ color: svc.color }} />
                  <h3
                    className="text-text-primary font-semibold text-[15px]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {svc.name}
                  </h3>
                </div>
                <div className="w-full h-px bg-space-border mb-4" />
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
                  {svc.description}
                </p>
                <p
                  className="text-[12px] mb-4"
                  style={{ color: svc.color, fontFamily: 'var(--font-mono)' }}
                >
                  {svc.metric}
                </p>
                <span className="text-sm text-text-secondary group-hover:text-electric-blue transition-colors">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
      </div>
    </section>
  )
}
