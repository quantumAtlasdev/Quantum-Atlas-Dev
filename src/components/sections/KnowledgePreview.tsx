'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Placeholder blog posts — will be replaced by CMS data
const placeholderPosts = [
  {
    title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown',
    category: 'Technical Deep Dive',
    readTime: 12,
    date: 'Apr 2026',
    href: '/blog',
  },
  {
    title: 'Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened',
    category: 'AI Implementation',
    readTime: 8,
    date: 'Mar 2026',
    href: '/blog',
  },
  {
    title: 'On-Premise AI for Government: What Actually Matters',
    category: 'Industry Guide',
    readTime: 6,
    date: 'Mar 2026',
    href: '/blog',
  },
]

function WhitepaperGate() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-8">
        <div className="w-12 h-12 rounded-full bg-quantum-green/10 flex items-center justify-center">
          <span className="text-quantum-green text-2xl">&#10003;</span>
        </div>
        <p className="text-text-primary font-semibold">Guide sent to your inbox</p>
        <p className="text-text-secondary text-sm">Check your email for the RAG Architecture Guide.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
      />
      <input
        type="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-electric-blue text-white text-sm font-semibold hover:bg-electric-blue/90 transition-colors disabled:opacity-70"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {loading ? 'Sending...' : 'Download Free \u2192'}
      </button>
      <p className="text-[11px] text-text-secondary text-center">No spam. One email with your guide.</p>
    </form>
  )
}

export function KnowledgePreview() {
  return (
    <section className="py-24 px-6 lg:px-8" style={{ background: '#0D1117' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Knowledge Hub
          </p>
          <h2 className="text-4xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            How we think. What we have learned.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog posts — left 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {placeholderPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={post.href}
                  className="flex flex-col gap-3 p-5 rounded-xl border border-space-border hover:border-electric-blue/40 transition-all group"
                  style={{ background: '#13192A' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{ background: '#FFBF0020', color: '#FFBF00', fontFamily: 'var(--font-mono)' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-text-secondary text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {post.readTime} min read &middot; {post.date}
                    </span>
                  </div>
                  <h3
                    className="text-text-primary text-[15px] font-medium leading-snug group-hover:text-electric-blue transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
            <Link
              href="/blog"
              className="text-sm text-text-secondary hover:text-electric-blue transition-colors mt-2"
            >
              View all articles &rarr;
            </Link>
          </div>

          {/* Whitepaper gate — right column */}
          <motion.div
            className="rounded-xl border border-space-border p-6"
            style={{ background: '#13192A', borderTop: '3px solid #A855F7' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-atlas-purple text-[10px] tracking-[2px] uppercase mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Free Guide
            </p>
            <h3
              className="text-text-primary font-semibold text-base mb-2 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Enterprise RAG Architecture Guide &mdash; On-Premise Deployment
            </h3>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              How to build a production-grade RAG system using PostgreSQL, pgvector,
              ParadeDB and Apache AGE &mdash; without proprietary vector databases.
            </p>
            <WhitepaperGate />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
