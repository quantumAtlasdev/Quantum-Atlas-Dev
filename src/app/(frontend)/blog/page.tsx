import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical deep dives, AI implementation guides, and industry insights from the team at Quantum Atlas.',
}

// Placeholder posts — will be replaced by Payload CMS data
const placeholderPosts = [
  { title: 'How We Built a Voice Agent at $0.08/min — Full Technical Breakdown', slug: 'voice-agent-cost-breakdown', category: 'Technical Deep Dive', excerpt: 'A complete breakdown of the architecture, cost components, and engineering decisions behind our production voice AI deployment.', date: 'Apr 2026', readTime: 12, featured: true },
  { title: 'Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened', slug: 'postgresql-rag-vs-pinecone', category: 'AI Implementation', excerpt: 'The case for keeping all your data in one database — and the retrieval quality results that justified the decision.', date: 'Mar 2026', readTime: 8, featured: false },
  { title: 'On-Premise AI for Government: What Actually Matters', slug: 'on-premise-government-ai', category: 'Industry Guide', excerpt: 'After working with government departments on AI procurement, here is what separates deployable from demoable.', date: 'Mar 2026', readTime: 6, featured: false },
  { title: 'Contract Analysis at Scale — Processing 500 Agreements in 2 Hours', slug: 'contract-analysis-at-scale', category: 'Technical Deep Dive', excerpt: 'The pipeline architecture behind bulk contract intelligence — OCR, extraction, clause analysis, and the audit trail.', date: 'Feb 2026', readTime: 10, featured: false },
  { title: 'How We Reduced a 15-Person Team to 2 With AI Automation', slug: 'team-reduction-automation', category: 'AI Implementation', excerpt: 'Internal proof: the LangGraph + n8n architecture that automated accounting and HR workflows for the Navbharat group.', date: 'Feb 2026', readTime: 7, featured: false },
  { title: 'The Real Cost of Nanonets vs Building Your Own IDP Pipeline', slug: 'nanonets-vs-custom-idp', category: 'Technical Deep Dive', excerpt: 'A side-by-side cost and capability analysis — with production numbers from our own document processing deployment.', date: 'Jan 2026', readTime: 9, featured: false },
]

const categories = ['All', 'Technical Deep Dives', 'AI Implementation', 'Industry Guides', 'Case Studies', 'Company']

const categoryColors: Record<string, string> = {
  'Technical Deep Dive': '#FFBF00',
  'AI Implementation': '#00E5A0',
  'Industry Guide': '#A855F7',
  'Case Study': '#00E5A0',
  'Company': '#8896B3',
}

export default function BlogPage() {
  const featured = placeholderPosts.find((p) => p.featured)
  const rest = placeholderPosts.filter((p) => !p.featured)

  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#05080F' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Knowledge Hub · Blog
          </p>
          <h1 className="text-5xl font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            How we think. What we have learned.
          </h1>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm border cursor-pointer transition-colors"
                style={{
                  background: cat === 'All' ? '#FFBF00' : 'transparent',
                  color: cat === 'All' ? '#fff' : '#8896B3',
                  borderColor: cat === 'All' ? '#FFBF00' : '#1E2D4A',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col lg:flex-row gap-6 p-8 rounded-2xl border border-space-border hover:border-electric-blue/40 transition-all mb-10"
              style={{ background: '#13192A' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-2.5 py-1 rounded text-[11px] font-medium"
                    style={{ background: `${categoryColors[featured.category]}20`, color: categoryColors[featured.category], fontFamily: 'var(--font-mono)' }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-text-secondary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    {featured.readTime} min · {featured.date}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-electric-blue transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  {featured.title}
                </h2>
                <p className="text-text-secondary leading-relaxed">{featured.excerpt}</p>
              </div>
            </Link>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 p-6 rounded-xl border border-space-border hover:border-electric-blue/40 transition-all"
                style={{ background: '#13192A' }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded text-[10px]"
                    style={{ background: `${categoryColors[post.category]}20`, color: categoryColors[post.category], fontFamily: 'var(--font-mono)' }}
                  >
                    {post.category}
                  </span>
                  <span className="text-text-secondary text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {post.readTime} min · {post.date}
                  </span>
                </div>
                <h2 className="text-text-primary font-semibold leading-snug group-hover:text-electric-blue transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
