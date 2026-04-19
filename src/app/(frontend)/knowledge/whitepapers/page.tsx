import type { Metadata } from 'next'
import { WhitepaperGateFull } from '@/components/forms/WhitepaperGateFull'

export const metadata: Metadata = {
  title: 'Whitepapers & Technical Guides',
  description: 'Free technical guides and ROI frameworks from Quantum Atlas.',
}

const whitepapers = [
  { id: 'rag-guide', title: 'Enterprise RAG Architecture Guide — On-Premise Deployment', description: 'How to build a production-grade RAG system using PostgreSQL, pgvector, ParadeDB and Apache AGE — without proprietary vector databases.', category: 'Technical', color: '#A855F7', pages: 24 },
  { id: 'voice-calculator', title: 'AI Voice Agent Cost Calculator for Enterprises', description: 'A detailed cost model comparing self-hosted voice AI vs VAPI + ElevenLabs — with production numbers from four months of deployment.', category: 'ROI Analysis', color: '#FFBF00', pages: 12 },
  { id: 'idp-roi', title: 'IDP vs Manual Processing — ROI Analysis Template', description: 'Calculate your document processing ROI: cost per page, processing speed, error rates, and total cost of ownership.', category: 'ROI Analysis', color: '#00E5A0', pages: 16 },
  { id: 'contract-guide', title: 'Contract Intelligence Implementation Guide for Legal Teams', description: 'A practical guide to deploying AI-assisted contract review — from document preparation to production deployment.', category: 'Implementation', color: '#A855F7', pages: 20 },
  { id: 'govt-checklist', title: 'Government AI Procurement — Technical Requirements Checklist', description: 'What government IT procurement officers need to evaluate AI vendors — data sovereignty, audit requirements, and on-premise deployment.', category: 'Compliance', color: '#FFBF00', pages: 10 },
]

export default function WhitepapersPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Whitepapers & Guides
          </p>
          <h1 className="text-5xl font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Free with email registration
          </h1>
          <p className="text-text-secondary text-lg">Production-grade technical guides — no filler, no upsell.</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {whitepapers.map((wp) => (
            <WhitepaperGateFull key={wp.id} whitepaper={wp} />
          ))}
        </div>
      </section>
    </div>
  )
}
