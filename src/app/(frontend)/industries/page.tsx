import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'AI solutions for government, logistics, fintech, legal, manufacturing, healthcare, and real estate.',
}

const industries = [
  { name: 'Government', slug: 'government', headline: "AI that passes the CISO's checklist", color: '#A855F7' },
  { name: 'Logistics & Shipping', slug: 'logistics-shipping', headline: 'Documents processed before the cargo lands', color: '#FFBF00' },
  { name: 'Fintech & BFSI', slug: 'fintech-bfsi', headline: 'KYC in seconds. Compliance maintained.', color: '#00E5A0' },
  { name: 'Legal', slug: 'legal', headline: '500 contracts reviewed before the weekend', color: '#A855F7' },
  { name: 'Manufacturing', slug: 'manufacturing', headline: 'From PO to production floor without the handoffs', color: '#FFBF00' },
  { name: 'Healthcare', slug: 'healthcare', headline: 'Clinical decisions supported by accurate document processing', color: '#00E5A0' },
  { name: 'Real Estate', slug: 'real-estate', headline: 'Property documents processed before the signing date', color: '#FFBF00' },
]

export default function IndustriesPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-24 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Industries
          </p>
          <h1 className="text-5xl font-bold text-text-primary leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Deep vertical expertise. Not generic AI.
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group p-6 rounded-xl border border-space-border hover:-translate-y-1 transition-all"
              style={{ background: '#13192A', borderTop: `3px solid ${ind.color}` }}
            >
              <h2 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-electric-blue transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {ind.name}
              </h2>
              <p className="text-text-secondary text-sm">{ind.headline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
