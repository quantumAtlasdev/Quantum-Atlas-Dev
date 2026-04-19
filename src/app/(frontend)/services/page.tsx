import type { Metadata } from 'next'
import Link from 'next/link'
import { Mic2, FileText, Brain, Code2, Workflow, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Enterprise AI services — voice agents, document intelligence, RAG systems, custom SaaS, automation, and content production.',
}

const services = [
  { icon: Mic2, name: 'AI Voice Agents', slug: 'ai-voice-agents', color: '#FFBF00', tagline: '$0.08/min · 4 months production · Airtel/Jio native', description: 'Self-hosted inbound and outbound voice agents with Indian carrier integration.' },
  { icon: FileText, name: 'Document Intelligence', slug: 'document-intelligence', color: '#00E5A0', tagline: '$0.08/page · 3.5x cheaper than Nanonets · Hundreds per minute', description: 'Bulk IDP pipeline with contract intelligence and workflow integration.' },
  { icon: Brain, name: 'Enterprise RAG', slug: 'enterprise-rag', color: '#A855F7', tagline: 'On-premise · Citations on every answer · PostgreSQL-native', description: 'Hybrid retrieval knowledge systems for government and regulated enterprises.' },
  { icon: Code2, name: 'Custom SaaS Development', slug: 'saas-development', color: '#FFBF00', tagline: 'iKargos reference · 1000+ clients · Full multi-tenancy', description: 'Production-grade multi-tenant SaaS platforms built from scratch.' },
  { icon: Workflow, name: 'AI Automation', slug: 'ai-automation', color: '#00E5A0', tagline: '15→2 staff · LangGraph + n8n · Tally ETL', description: 'Stateful agent graphs and workflow orchestration for enterprise processes.' },
  { icon: Video, name: 'Content & Video', slug: 'content-video', color: '#A855F7', tagline: 'ComfyUI · Tavus · Digital avatars', description: 'AI-powered video production pipeline for enterprise content at scale.' },
]

export default function ServicesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-24 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Services
          </p>
          <h1 className="text-5xl font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            The full stack. Under one roof.
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            One partner for voice AI, document intelligence, RAG systems, and custom SaaS.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col gap-4 p-8 rounded-2xl border border-space-border hover:-translate-y-1 transition-all"
                style={{ background: '#13192A', borderTop: `3px solid ${svc.color}` }}
              >
                <Icon size={28} style={{ color: svc.color }} />
                <div>
                  <h2 className="text-text-primary font-bold text-xl mb-1 group-hover:text-electric-blue transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {svc.name}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">{svc.description}</p>
                  <p className="text-[12px]" style={{ color: svc.color, fontFamily: 'var(--font-mono)' }}>{svc.tagline}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
