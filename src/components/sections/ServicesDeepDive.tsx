'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    id: 'voice',
    color: '#FFBF00',
    label: 'AI Voice Agents',
    heading: 'Voice AI at a tenth of the cost',
    description:
      'Enterprise inbound and outbound voice agents with native Indian carrier integration. Self-hosted. No Twilio. No ElevenLabs.',
    bullets: [
      'Airtel + Jio SIP integration — no third-party carrier markup',
      '$0.08/minute end-to-end cost — verified over 4 months production',
      'RAG-powered agents — know your business, not just scripts',
      'Grafana + Prometheus observability — every call logged',
      '4 months in production at Navbharat Shipping',
    ],
    href: '/services/ai-voice-agents',
    bg: '#0D1117',
    visual: 'call-flow',
  },
  {
    id: 'idp',
    color: '#00E5A0',
    label: 'Document Intelligence',
    heading: 'Hundreds of documents. Minutes, not days.',
    description:
      'Bulk intelligent document processing with domain fine-tuning. Three times cheaper than Nanonets. On-premise available.',
    bullets: [
      '$0.08 per page — vs $0.30 at Nanonets',
      'Contract clause extraction and risk flagging',
      'Fine-tuned models for your document types',
      'Bulk processing pipeline — hundreds in minutes',
      'On-premise deployment for data sovereignty',
    ],
    href: '/services/document-intelligence',
    bg: '#05080F',
    visual: 'doc-flow',
  },
  {
    id: 'rag',
    color: '#A855F7',
    label: 'Enterprise RAG',
    heading: 'Knowledge systems governments trust',
    description:
      'Hybrid retrieval — BM25 + vector + graph — all on PostgreSQL. Citations on every answer. On-premise. SOC2-grade architecture.',
    bullets: [
      'Hybrid retrieval — keyword + semantic + graph',
      'Every answer cites the source document',
      'Multi-tenant with complete data isolation',
      'On-premise deployment — no data leaves your servers',
      'Langfuse observability — full audit trail',
    ],
    href: '/services/enterprise-rag',
    bg: '#0D1117',
    visual: 'rag-diagram',
  },
  {
    id: 'saas',
    color: '#FFBF00',
    label: 'Custom SaaS Development',
    heading: 'Replace your ERP. Own your platform.',
    description:
      'Production-grade multi-tenant SaaS built for your exact workflow. Not a template. Not a customized off-the-shelf product.',
    bullets: [
      'Full multi-tenancy with row-level security',
      'Clerk auth + Stripe billing built in',
      'Self-hosted — you own everything',
      'Proven: replaced a costly legacy ERP with iKargos',
      'API-first — integrates with anything',
    ],
    href: '/services/saas-development',
    bg: '#05080F',
    visual: 'arch-diagram',
  },
]

function ServiceVisual({ color }: { color: string }) {
  return (
    <div
      className="rounded-xl border border-space-border p-8 flex items-center justify-center min-h-64"
      style={{ background: 'rgba(255,191,0,0.04)' }}
    >
      <div
        className="w-48 h-48 rounded-full border-2 opacity-40 flex items-center justify-center"
        style={{ borderColor: color, borderStyle: 'dashed' }}
      >
        <div
          className="w-24 h-24 rounded-full border opacity-60"
          style={{ borderColor: color, background: `${color}10` }}
        />
      </div>
    </div>
  )
}

export function ServicesDeepDive() {
  return (
    <div>
      {services.map((svc, i) => (
        <section
          key={svc.id}
          className="py-24 px-6 lg:px-8"
          style={{ background: svc.bg }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content — alternates left/right */}
            <motion.div
              className={i % 2 === 1 ? 'lg:order-2' : ''}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-[11px] tracking-[3px] uppercase mb-3"
                style={{ color: svc.color, fontFamily: 'var(--font-mono)' }}
              >
                {svc.label}
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-text-primary leading-[1.15] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {svc.heading}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">{svc.description}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {svc.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span style={{ color: svc.color }} className="mt-0.5 shrink-0">◆</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={svc.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border text-sm font-medium transition-all hover:opacity-80"
                style={{
                  borderColor: svc.color,
                  color: svc.color,
                  fontFamily: 'var(--font-display)',
                }}
              >
                Learn about {svc.label} →
              </Link>
            </motion.div>

            {/* Visual */}
            <motion.div
              className={i % 2 === 1 ? 'lg:order-1' : ''}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <ServiceVisual color={svc.color} />
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  )
}
