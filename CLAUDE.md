# CLAUDE.md — Quantum Atlas
> Project context file for Claude Code agents
> Place at: `C:\projects\quantum-atlas\CLAUDE.md`
> Read this completely before writing any code or making any decisions.
> Last updated: April 2026

---

## FOUNDER CONTEXT — READ THIS FIRST

Quantum Atlas is built by Anurag. Civil Engineering background, not IT. Self-taught
entire AI/tech stack over 12 months from zero. Runs four companies simultaneously.

**Core philosophy — non-negotiable:**
- Deep planning before any execution. Never start building without a complete spec.
- No half-baked work. Everything is production-grade or it does not ship.
- No over-commitment to clients. Only promise what is built and tested.
- Ethics is not a value statement — it is embedded in every technical decision.
- Long-term thinking. Anticipate future problems and solve them in the architecture now.
- Care about people who use the work. Their success is the measure of success.

**What this means for agents:**
- Never suggest shortcuts that compromise quality
- Never recommend a tool that creates vendor dependency without flagging it
- Always think about what happens at 10x scale before recommending an approach
- When in doubt, plan more — do not proceed with assumptions
- Small details matter. Get them right.

---

## WHAT QUANTUM ATLAS IS

**Company:** Quantum Atlas (domain TBD — targeting .ai extension)
**Market:** Global — India beachhead, US/Europe expansion
**Structure:** Completely separate brand from Navbharat group companies
**Model:** Services + productized offerings (not pure SaaS initially)

**Positioning:**
> Full-stack AI implementation partner for enterprises — production-grade delivery,
> not demos or PoCs. Every system we build runs in production before we sell it.

**What makes this different from every other Indian AI agency:**
- Everything demonstrated has been running in production in our own companies
- Self-hosted infrastructure — clients own their data, no vendor lock-in
- On-premise deployment capability — critical for government and regulated industries
- End-to-end capability — voice to RAG to SaaS to infra — one team, one relationship
- Real internal ROI: replaced ₹55L ERP, reduced 15-person team to 2, voice AI at
  ₹7/min vs ₹60-70/min market rate

---

## ACTIVE PIPELINE — KNOW THIS BEFORE BUILDING ANYTHING

These are real inbound deals, not hypotheticals. Website and marketing must
reflect these realities, not generic AI agency claims.

**Deal 1 — Maharashtra Government IGST (RAG)**
- 40 Customs Commissioners arranged a conference at their own initiative
- All expenses paid by them — this was not a sales pitch
- They saw the RAG system working and want it for IGST department
- Proposal in advanced stages
- Requirements: on-premise deployment, data sovereignty, officer-level access
  controls, full audit trail, citation on every answer
- Our architecture already handles all of this

**Deal 2 — DHL (Document Intelligence)**
- DHL approached us — we did not approach them
- They saw the full iKargos CHA platform + bulk document processing pipeline
- Tested on a dedicated production server built specifically for their evaluation
- Not a POC — fully production-ready system
- Capability: processes hundreds of documents in minutes with high accuracy
- Their requirement: speed + accuracy at enterprise scale

**Deal 3 — 1000+ Existing Logistics Clients**
- Navbharat Shipping + iKargos — 40+ years in shipping/logistics
- Corporate clients include DHL, UPS and large Indian enterprises
- Warm relationships — no cold outreach needed
- Immediate opportunities: voice AI, IDP, workflow automation

---

## SERVICES — WHAT WE ACTUALLY OFFER

All services listed below have production proof in our own companies.
Never claim a capability that has not been built and tested.

### Core Services

**1. AI Voice Agents**
- Self-hosted LiveKit (NOT LiveKit Cloud)
- Airtel + Jio SIP integration (NOT Twilio)
- Deepgram STT/TTS
- LangGraph + n8n + Pydantic orchestration
- Cost: ~₹7/minute (vs ₹60-70/minute with VAPI + ElevenLabs)
- Production proof: 4+ months, Navbharat Shipping, inbound + outbound
- Observability: Grafana + Prometheus
- Use cases: call center automation, outbound lead qualification,
  appointment booking, delivery notifications, customer support

**2. Intelligent Document Processing (IDP) & Contract Intelligence**
- Bulk processing: hundreds of documents in minutes
- GLM OCR + Google Document AI + LLMWhisperer pipelines
- n8n orchestration for document workflows
- Dual deployment: on-premise (enterprise) + managed cloud (mid-market)
- Fine-tuned models via Unsloth + Label Studio for domain accuracy
- Cost: ₹7/page vs Nanonets ₹25/page (3.5x cheaper) — verified market data
- Speed: bulk hundreds of documents in minutes vs Nanonets 2 pages/minute

THREE LAYERS:
  Layer 1 — Document Extraction
  Extract structured data from any document type. Invoices, KYC,
  BOE, shipping docs, tax forms, bank statements, medical records.

  Layer 2 — Contract & Document Intelligence (HIGH VALUE)
  Clause extraction, obligation and deadline tracking, risk flagging,
  cross-contract analysis, Q&A on document corpus via RAG,
  audit trail on every extraction.
  Replaces paralegals at ₹30-60K/month with ₹7/page processing.

  Layer 3 — Workflow Integration
  Connect to ERP, CRM, Tally, accounting systems via n8n.
  Custom API for any downstream system.

Target verticals:
  - Fintech/BFSI: loan processing, KYC, insurance claims, trade finance
  - Legal: contract analysis, due diligence, M&A review, NDA processing
  - Manufacturing: PO processing, quality certs, import/export docs
  - Government: IGST circulars, customs notifications, tender documents
  - Healthcare: patient records, insurance pre-auth, clinical docs
  - Real Estate: property documents, sale deeds, lease agreements, NOCs
  - Logistics/Shipping: our home domain — BOE, BL, certificates of origin

**3. Enterprise RAG / Knowledge Systems**
- Hybrid retrieval: BM25 (ParadeDB) + pgvector + Apache AGE graph
- All on PostgreSQL — no separate vector database
- Query decomposition + RRF fusion (k=60) + reranking
- Jina v4 embeddings (asymmetric — query vs passage LoRA)
- Citations on every answer — auditable, verifiable
- Multi-tenant with RLS — complete data isolation
- Langfuse observability — full query audit trail
- On-premise deployment — critical for government clients
- SOC2-grade architecture
- Use cases: government regulation search, legal knowledge bases,
  internal policy search, compliance systems, IGST/customs circulars

**4. Custom AI SaaS Development**
- Full multi-tenant SaaS from scratch
- Next.js + FastAPI + PostgreSQL + Docker + Pulumi
- Clerk auth + Stripe billing
- Production proof: iKargos CHA portal (1000+ corporate clients)
- We replace expensive rigid ERPs with purpose-built systems
- Reference: replaced Logi-Sys (₹55L cost) with iKargos

**5. AI Automation & Workflow Engineering**
- n8n self-hosted workflow automation
- LangGraph stateful agent graphs
- MCP server development with safety gates
- Tally ETL pipelines (India SME market)
- Internal ROI proof: 15-person accounting/HR team reduced to 2

### Supporting Services (offered to avoid client needing multiple vendors)
**6. AI Content & Video Production**
- ComfyUI: digital avatars, lipsync, virtual try-on, PuLID face identity,
  long video generation (FramePack), inpainting, upscaling
- Tavus video avatar integration
- Adobe Premiere post-production
- Use cases: corporate training videos, product demos, marketing content

---

## TARGET CLIENTS

### Primary (India)
- Government departments needing on-premise AI (RAG, IDP)
- Logistics and shipping companies (voice AI, IDP, automation)
- BFSI — banks, insurance (IDP, RAG, voice AI)
- Healthcare — hospitals, pharma (IDP, RAG, compliance)
- Mid-to-large enterprises replacing expensive ERPs

### Secondary (Global)
- Enterprises needing document intelligence at scale
- Companies with high call volume wanting to reduce per-minute costs
- Organizations with compliance/regulatory knowledge management needs

### NOT our clients
- Small businesses wanting a chatbot
- Clients who want demos, not production systems
- Anyone who needs a quick turnaround on half-built work
- Price-sensitive clients who cannot value quality

---

## PRICING PHILOSOPHY

- Never compete on lowest price
- Price reflects production-grade quality and real business outcomes
- Voice AI pricing: per-minute or monthly retainer based on volume
- IDP pricing: per-document or monthly volume-based
- RAG: implementation fee + monthly maintenance
- SaaS dev: project-based with clear scope
- Government: project-based, procurement-compliant
- Always anchor on client ROI — what does this save them vs current cost

---

## COMPETITIVE DIFFERENTIATION — USE IN ALL CONTENT

These are facts, not marketing claims. Every point has production proof.

1. **Production first** — Every system runs in our own companies before we sell it
2. **₹7/min voice AI** — 10x cheaper than VAPI+ElevenLabs, Airtel/Jio native
3. **Self-hosted everything** — No data leaves client premises if required
4. **On-premise capable** — Can deploy in air-gapped government environments
5. **No vendor lock-in** — We use Postgres, not proprietary vector DBs
6. **Full-stack** — Voice to RAG to SaaS to infra — one team
7. **40+ year trust network** — Not a startup with no references
8. **Real internal ROI** — ₹55L ERP replaced, 13 staff automated, ₹7/min proven

---

## WEBSITE REQUIREMENTS

### Tech Stack
- Next.js 16.2 (App Router, Turbopack, TypeScript)
- Payload CMS 3.x (PostgreSQL adapter, admin at /admin)
- Tailwind CSS + shadcn/ui (New York style)
- GSAP (homepage scroll animations — first 3 sections)
- Framer Motion (page transitions, scroll reveals)
- PostgreSQL on Contabo VPS
- pnpm as package manager
- Caddy reverse proxy

### Design Direction
TBD — Anurag to decide: dark vs light theme, brand colors, domain
Do NOT start building until design decisions are confirmed.
Reference: nwpl-website used "Lab White" aesthetic — Quantum Atlas
needs its own distinct identity appropriate for a global AI company.

### Pages Required (draft — confirm before building)
1. Homepage — hero, services overview, proof points, CTA
2. Services (5 core service pages)
3. Case Studies (Maharashtra IGST, DHL, Navbharat Shipping — when approved)
4. About — founder story, philosophy, why we build this way
5. Industries (logistics, government, BFSI, healthcare)
6. Contact / Discovery call booking

### Key Content Principles
- Lead with proof, not claims
- Real numbers: ₹7/min, 100s of docs in minutes, 4 months production
- No "AI-generated" aesthetic — genuine, precise, technical authority
- Founder's philosophy must come through — ethics, long-term, no half-baked
- Discovery call as primary CTA — not a contact form, a real conversation

---

## DEPLOYMENT

- Contabo VPS (separate from Navbharat Water and iKargos servers)
- Caddy reverse proxy with auto SSL
- PM2 for process management
- PostgreSQL on same VPS
- Domain: TBD (pending Anurag decision)
- Tailscale for internal network access

---

## PROJECT STRUCTURE

```
C:\projects\quantum-atlas\
├── CLAUDE.md              ← This file
├── AGENTS.md              ← Cross-session learnings (start empty, build up)
├── HANDOFF.md             ← Current implementation state
├── SPEC.md                ← Full website specification (write before building)
├── openspec/
│   └── changes/           ← Feature specs for agent delegation
│       ├── 01-foundation/
│       ├── 02-homepage/
│       ├── 03-service-pages/
│       ├── 04-case-studies/
│       └── 05-cms-setup/
├── src/                   ← Next.js + Payload CMS code
├── public/                ← Static assets
└── docs/                  ← Architecture decisions, design system
```

---

## IMPLEMENTATION ORDER — DO NOT DEVIATE

1. **SPEC.md first** — Complete website specification before any code
2. **Design decisions confirmed** — Theme, colors, domain, fonts
3. **Payload CMS collections defined** — Before any frontend work
4. **Homepage built and approved** — Before other pages
5. **Service pages** — One at a time, approved before next
6. **Case studies** — Only after client approval to use their name
7. **CMS content** — Populated before launch

---

## CODING STANDARDS

Follow global CLAUDE.md standards. Additionally for this project:
- pnpm only — never npm or yarn
- Payload CMS for ALL content — no hardcoded copy in components
- Every page must have proper metadata for SEO
- Structured data (JSON-LD) on all pages
- Images: next/image with WebP, proper alt text
- Core Web Vitals must pass before launch
- Mobile-first — logistics clients often on mobile

---

## WHAT NOT TO DO

- Do not start coding before SPEC.md is complete and approved
- Do not use generic AI agency copy ("Unlock the power of AI...")
- Do not make capability claims that do not have production proof
- Do not use dark patterns or aggressive CTAs
- Do not suggest Vercel — self-hosted on Contabo
- Do not use npm — use pnpm
- Do not build case studies without explicit client approval
- Do not rush — quality over speed, always

---

## SESSION START CHECKLIST

Before starting any Claude Code session on this project:
1. Read this CLAUDE.md completely
2. Read AGENTS.md for accumulated learnings
3. Read HANDOFF.md for current state
4. Confirm which openspec change you are working on
5. Do not proceed if design decisions are still pending

---

## CURRENT STATUS

**Phase:** Planning — SPEC.md not yet written
**Next action:** Confirm design decisions (theme, colors, domain), then write SPEC.md
**Blocking:** Anurag to decide on brand identity before build begins
**Do not:** Write any code until SPEC.md is complete and approved

---

## BLOG & KNOWLEDGE HUB — FOLLOW NWPL PATTERN

Same architecture as nwpl-website. Payload CMS manages all content.

### Blog (`/blog`)

**Listing page:**
- Category tabs: All | Technical Deep Dives | AI Implementation | Industry Guides | Case Studies | Company
- Grid of blog cards (featured image, title, excerpt, date, category tag, read time)
- Pagination
- Featured post at top (full-width hero card)

**Individual post page:**
- Hero image (full-width)
- Title (display font — TBD based on design)
- Author + date + read time + category badge
- Rich text content (Payload Lexical editor)
- Table of contents sidebar (desktop, sticky)
- Related posts (3 cards at bottom)
- CTA at bottom contextual to topic:
  "Interested in [topic] for your company? Book a discovery call."
- Schema: Article + FAQPage if FAQ section present
- SEO: generateMetadata from post title + excerpt

**Content strategy — topics that establish authority:**
- "How We Built a Voice Agent at ₹7/minute (Full Technical Breakdown)"
- "Why We Chose PostgreSQL Over Pinecone for RAG — And What Happened"
- "Replacing a ₹55 Lakh ERP with Custom Software — Lessons Learned"
- "On-Premise AI for Government: What Actually Matters"
- "Contract Analysis at Scale — Processing 500 Agreements in 2 Hours"
- "The Real Cost of Nanonets vs Building Your Own IDP Pipeline"
- "How We Reduced a 15-Person Team to 2 With AI Automation"
- "IGST Document Processing — A Technical Architecture Guide"
- Industry guides: fintech, legal, manufacturing, logistics per vertical

**Payload CMS blog-posts collection:**
```typescript
{
  slug: 'blog-posts',
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText' }, // Lexical editor
    { name: 'category', type: 'select', required: true,
      options: ['technical-deep-dive', 'ai-implementation',
                'industry-guide', 'case-study', 'company'] },
    { name: 'author', type: 'relationship', relationTo: 'team-members' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedDate', type: 'date' },
    { name: 'readTime', type: 'number' }, // minutes
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'relatedPosts', type: 'relationship',
      relationTo: 'blog-posts', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
    ]},
  ],
}
```

---

### Knowledge Hub (`/knowledge`)

Same as NWPL knowledge hub — four tools/resources in one section.

**Section 1 — Whitepapers & Technical Guides**
- Downloadable PDFs — gated behind email capture
- Topics:
  - "Enterprise RAG Architecture Guide — On-Premise Deployment"
  - "AI Voice Agent Cost Calculator for Indian Enterprises"
  - "IDP vs Manual Processing — ROI Analysis Template"
  - "Contract Intelligence Implementation Guide for Legal Teams"
  - "Government AI Procurement — Technical Requirements Checklist"
- Email captured → stored in Payload inquiries collection
- Triggers n8n workflow → sends PDF + adds to email sequence

**Section 2 — ROI Calculator**
Interactive tool — similar to NWPL ROI calculator.
Input: current document volume/month, current processing cost,
       call center size, current cost per minute
Output: monthly savings, annual savings, payback period,
        comparison vs Nanonets/VAPI pricing
CTA: "Share this analysis with our team" → discovery call booking

**Section 3 — Implementation Guides**
Step-by-step guides for each service:
- Voice AI setup checklist
- RAG implementation requirements
- IDP document type coverage guide
- AI readiness assessment

**Section 4 — Case Studies (when client-approved)**
- Maharashtra IGST (pending approval)
- DHL Document Intelligence (pending approval)
- Navbharat Shipping Voice AI (internal — can use)
- iKargos ERP replacement (internal — can use)

**Payload CMS whitepapers collection:**
```typescript
{
  slug: 'whitepapers',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'file', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'select',
      options: ['technical', 'roi-analysis', 'implementation',
                'industry-guide', 'compliance'] },
    { name: 'service', type: 'select',
      options: ['voice-ai', 'idp', 'rag', 'saas', 'automation'] },
    { name: 'downloadCount', type: 'number',
      defaultValue: 0, admin: { readOnly: true } },
    { name: 'publishedDate', type: 'date' },
    { name: 'gated', type: 'checkbox', defaultValue: true },
  ],
}
```

**Payload CMS case-studies collection:**
```typescript
{
  slug: 'case-studies',
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'client', type: 'text' }, // e.g. "Leading Indian Logistics Company"
    { name: 'clientLogo', type: 'upload', relationTo: 'media' },
    { name: 'approved', type: 'checkbox', defaultValue: false },
    { name: 'service', type: 'select', hasMany: true,
      options: ['voice-ai', 'idp', 'rag', 'saas', 'automation'] },
    { name: 'industry', type: 'select',
      options: ['government', 'logistics', 'fintech', 'legal',
                'manufacturing', 'healthcare', 'real-estate'] },
    { name: 'challenge', type: 'richText' },
    { name: 'solution', type: 'richText' },
    { name: 'outcomes', type: 'array', fields: [
      { name: 'metric', type: 'text' }, // e.g. "Cost per minute"
      { name: 'before', type: 'text' }, // e.g. "₹65/min"
      { name: 'after', type: 'text' },  // e.g. "₹7/min"
    ]},
    { name: 'techStack', type: 'array',
      fields: [{ name: 'technology', type: 'text' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ]},
  ],
}
```

---

### Updated Page List (revised from earlier draft)

1. Homepage
2. Services — overview
3. /services/ai-voice-agents
4. /services/document-intelligence
5. /services/enterprise-rag
6. /services/saas-development
7. /services/ai-automation
8. /services/content-video (supporting)
9. Industries — overview
10. /industries/government
11. /industries/logistics-shipping
12. /industries/fintech-bfsi
13. /industries/legal
14. /industries/manufacturing
15. /industries/healthcare
16. /industries/real-estate
17. /blog (listing)
18. /blog/[slug] (individual posts)
19. /knowledge (hub)
20. /knowledge/whitepapers
21. /knowledge/roi-calculator
22. /knowledge/case-studies
23. /knowledge/[whitepaper-slug] (gated download)
24. /case-studies/[slug]
25. About
26. Contact / Book Discovery Call
