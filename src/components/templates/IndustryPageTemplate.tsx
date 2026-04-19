'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Script from 'next/script'

export interface IndustryPageData {
  id: string
  name: string
  heroHeadline: string
  heroSubtext: string
  challenges: { title: string; body: string }[]
  services: { name: string; href: string; color: string; relevance: string }[]
  compliance: { title: string; body: string }[]
  activeWork: { sector: string; outcome: string; color: string } | null
  ctaHeadline: string
}

export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI for ${data.name}`,
    description: data.heroSubtext,
    provider: {
      '@type': 'Organization',
      name: 'Quantum Atlas',
      url: 'https://quantumatlas.ai',
    },
    areaServed: 'India',
  }

  return (
    <div className="bg-space-dark min-h-screen">
      <Script
        id={`ld-${data.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              {data.name}
            </p>
            <h1 className="text-5xl font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {data.heroHeadline}
            </h1>
            <p className="text-text-secondary text-xl leading-relaxed max-w-2xl">{data.heroSubtext}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0D1117' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Industry Challenges
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.challenges.map((c, i) => (
                <div key={i} className="p-6 rounded-xl border border-space-border" style={{ background: '#13192A' }}>
                  <h3 className="text-text-primary font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services for this industry */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Services for {data.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.services.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="p-5 rounded-xl border border-space-border hover:-translate-y-1 transition-all group"
                  style={{ background: '#13192A', borderTop: `3px solid ${svc.color}` }}
                >
                  <p className="text-text-primary font-semibold mb-1 group-hover:text-electric-blue transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {svc.name} &rarr;
                  </p>
                  <p className="text-text-secondary text-sm">{svc.relevance}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-6 lg:px-8" style={{ background: '#0D1117' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[3px] uppercase mb-8 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
              Compliance &amp; Requirements
            </p>
            <div className="flex flex-col gap-4">
              {data.compliance.map((c, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-3 p-5 rounded-xl border border-space-border" style={{ background: '#13192A' }}>
                  <p className="text-electric-blue font-medium min-w-40 shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.title}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active work */}
      {data.activeWork && (
        <section className="py-20 px-6 lg:px-8" style={{ background: '#05080F' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] tracking-[3px] uppercase mb-6 text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
                Active Work in This Sector
              </p>
              <div
                className="p-8 rounded-xl border border-space-border"
                style={{ background: '#13192A', borderTop: `3px solid ${data.activeWork.color}` }}
              >
                <span
                  className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium mb-4"
                  style={{ background: '#00E5A015', color: '#00E5A0', fontFamily: 'var(--font-mono)' }}
                >
                  Active
                </span>
                <p className="text-text-secondary text-[11px] tracking-wider uppercase mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {data.activeWork.sector}
                </p>
                <p className="text-text-primary text-lg leading-relaxed">{data.activeWork.outcome}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 text-center" style={{ background: '#0D1117' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {data.ctaHeadline}
            </h2>
            <p className="text-text-secondary mb-8">
              30 minutes. We review your specific challenge and show you relevant production examples.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
