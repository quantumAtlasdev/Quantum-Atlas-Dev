# QUANTUM ATLAS — Complete Website Specification
## Version 1.0 | April 2026

> **This is the definitive build specification for quantumatlas.ai**
> Read this document completely before writing any code.
> Follow the build order in Section 11 exactly. Do not skip steps.
> All decisions in this document are final unless explicitly updated.

---

## 1. PROJECT OVERVIEW

**Company:** Quantum Atlas
**Website:** quantumatlas.ai (primary) — quantumatlas.dev redirects here
**Goal:** Enterprise-grade B2B website that establishes Quantum Atlas as a
production-proven AI implementation partner. Every claim on this site
has production proof behind it. No marketing fiction.

**Company philosophy (must come through in all copy):**
- Production-first — every system runs in our own companies before we sell it
- No half-baked work — if it is not ready, it does not ship
- No over-commitment — only promise what is built and tested
- Long-term thinking — build institutions, not personal brands
- Ethics embedded in every technical decision

**Target buyers:**
- CTOs and IT leads at enterprise companies
- Operations heads at logistics and shipping companies
- Government IT procurement officers
- Legal and compliance heads at BFSI companies
- Senior decision-makers who evaluate on proof, not pitch

---

## 2. TECH STACK

```
Framework:        Next.js 16.2.2 (App Router, Turbopack, TypeScript)
CMS:              Payload CMS 3.x (PostgreSQL adapter, admin at /admin)
Styling:          Tailwind CSS 4.x + shadcn/ui (New York style)
3D / Hero:        React Three Fiber + @react-three/drei + Three.js
Animations:       Framer Motion (scroll reveals, page transitions, counters)
                  GSAP (hero text entrance only — surgical use)
Typography:       Space Grotesk (headings) + Inter (body) + JetBrains Mono (metrics/code)
Icons:            Lucide React
Charts:           Recharts (ROI calculator)
Forms:            React Hook Form + Zod validation
Email:            Resend (form submissions, whitepaper delivery)
Database:         PostgreSQL on Contabo VPS
Package manager:  pnpm (never npm or yarn)
Reverse proxy:    Caddy (auto SSL)
Process:          PM2
Hosting:          Contabo VPS — separate server from NWPL and iKargos
```

**What NOT to use:**
- No Vercel — self-hosted on Contabo
- No Lenis smooth scroll — standard scroll only
- No Remotion — pre-rendered assets only
- No dark mode toggle — dark IS the brand, no toggle needed

---

## 3. DESIGN SYSTEM — DEEP SPACE

### 3.1 Visual Philosophy
Precision navigation meets deep space. The name "Quantum Atlas" is a
navigation instrument — every design element reinforces this metaphor.
Coordinate grids, signal paths, node networks, atlas globes.
NOT: robots, brains, circuit boards, floating orbs, generic AI aesthetics.

The site is DARK. Deep space dark. Not "dark mode" as an option — dark
as the brand identity. Inner pages transition between dark grey and
occasional light sections for readability contrast.

### 3.2 Color Palette

```typescript
// tailwind.config.ts
colors: {
  'space-black':    '#05080F',   // Hero background — deepest dark
  'space-dark':     '#0D1117',   // Inner page default background
  'space-card':     '#13192A',   // Card backgrounds
  'space-border':   '#1E2D4A',   // Subtle borders, dividers
  'space-light':    '#F0F4FF',   // Light sections — ROI, callouts
  'electric-blue':  '#4F8EF7',   // Primary accent — CTAs, grid lines, globe
  'quantum-green':  '#00E5A0',   // Success, IDP service, data signals
  'atlas-purple':   '#A855F7',   // RAG/intelligence service, tertiary signals
  'text-primary':   '#E8EEFF',   // Near-white headings
  'text-secondary': '#8896B3',   // Body text, captions
  'mono-accent':    '#64FFDA',   // Monospace values — coordinates, metrics
}

// Service color mapping (consistent across all pages)
// Voice AI      → electric-blue  (#4F8EF7)
// IDP           → quantum-green  (#00E5A0)
// RAG           → atlas-purple   (#A855F7)
// SaaS Dev      → electric-blue  (#4F8EF7)
// Automation    → quantum-green  (#00E5A0)
```

### 3.3 Typography

```typescript
// app/layout.tsx
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Usage rules:**
- `--font-display` (Space Grotesk): All headings H1-H4, eyebrow labels
- `--font-body` (Inter): All body text, paragraphs, descriptions
- `--font-mono` (JetBrains Mono): Metrics, pricing, coordinates, code,
  technical values, stat numbers
- Never use font sizes below 12px
- Headings: Space Grotesk 700 weight
- Body: Inter 400 weight, 1.7 line height

### 3.4 Spacing & Layout

```css
/* Base grid */
--container-max: 1280px;
--container-padding: clamp(1.5rem, 5vw, 5rem);
--section-padding: clamp(4rem, 8vw, 8rem);

/* Component spacing */
--card-padding: 1.5rem 2rem;
--card-radius: 12px;
--border-subtle: 1px solid #1E2D4A;
```

### 3.5 Animation Principles

**GSAP** — hero text only:
- Staggered word entrance: `y: 20, opacity: 0 → y: 0, opacity: 1`
- Duration: 0.7s, ease: power3.out
- Stagger: 0.15s between elements

**Framer Motion** — everything else:
- Scroll reveals: `{ opacity: 0, y: 30 } → { opacity: 1, y: 0 }`
- Viewport trigger: `once: true, margin: "-100px"`
- Duration: 0.6s, ease: easeOut
- Counter animations: number counts up when entering viewport
- Page transitions: fade only — 0.3s opacity

**React Three Fiber** — globe only:
- Continuous rotation: 0.0022 rad/frame on Y axis
- Signal pulses: spawn every 260ms, travel along connection edges
- Three pulse colors: green, blue, purple
- Mouse parallax: subtle globe tilt following cursor (±5 degrees)

### 3.6 Page Background Pattern

```
Hero sections:              #05080F (space-black)
Default inner sections:     #0D1117 (space-dark)
Card backgrounds:           #13192A (space-card)
Highlight/callout sections: #F0F4FF (space-light) — used sparingly
CTA sections:               #05080F with electric-blue gradient overlay
Footer:                     #05080F
```

---

## 4. HERO SECTION — LOCKED DESIGN

### 4.1 Layout

```
Full viewport width × 100vh minimum
Background: #05080F
Radial gradient: ellipse at 68% 50%, #091422 → #05080F

Left side (6% padding from left edge):
  max-width: 390px
  Contains: eyebrow, H1, body, CTAs, stats row

Right side:
  React Three Fiber globe
  Position: absolute, right: 80px, top: 50%, translateY(-50%)
  Canvas: 520×520px
  Partially overlaps content area — creates depth
```

### 4.2 Eyebrow

```
◆ QUANTUM ATLAS · AI INFRASTRUCTURE
Font: JetBrains Mono, 11px, letter-spacing: 3px
Color: #00E5A0
Animated dot: 6px circle, #00E5A0, pulsing (scale 1→1.6, opacity 1→0.4)
```

### 4.3 Headline (current — update when tagline decided)

```
Built in
Production.
Proven at Scale.

Font: Space Grotesk 700, 44px, line-height: 1.08
Color: lines 1-2 → #E8EEFF
       line 3 (em) → #4F8EF7
GSAP entrance: staggered, y:20→0, opacity:0→1
```

### 4.4 Subheadline

```
AI systems that run in the real world —
voice agents, document intelligence,
knowledge systems and custom SaaS.
Self-hosted. Enterprise-grade.

Font: Inter 400, 15px, line-height: 1.72
Color: #8896B3
```

### 4.5 CTAs

```
Primary: [Book a Discovery Call]
  Background: #4F8EF7
  Color: #fff
  Padding: 13px 28px
  Border-radius: 6px
  Font: Space Grotesk 600, 14px
  Hover: brightness(1.1), slight scale(1.02)

Secondary: [See Our Work →]
  Background: transparent
  Color: #8896B3
  Border: 1px solid #1E2D4A
  Same padding/radius
  Hover: border-color: #4F8EF7, color: #E8EEFF
```

### 4.6 Stats Row

```
$0.08          |  4 mo        |  1000+          |  Govt
Per page · IDP |  Voice · Live|  Corporate      |  RAG · Active
                               clients

Font values: JetBrains Mono 700, 18px
Color values: alternating #00E5A0, #4F8EF7, #E8EEFF
Font labels: Inter 400, 10px, #8896B3
Dividers: 1px solid #1E2D4A
Animate: count up on viewport enter
```

### 4.7 Globe (React Three Fiber)

```javascript
// Specifications for R3F globe implementation
const GLOBE_CONFIG = {
  radius: 210,
  canvasSize: 520,
  position: { right: '80px' },
  rotation: { speed: 0.0022, axis: 'Y' },

  // Latitude rings
  latitudes: [-60, -40, -20, 0, 20, 40, 60],
  equatorColor: 'rgba(79,142,247,0.6)',
  latColor: 'rgba(79,142,247,0.14)',

  // Longitude lines — mix solid and dashed
  longitudeCount: 12,
  longitudeStep: 30,
  dashPattern: [3, 8], // every 3rd line dashed

  // Nodes
  nodeGrid: { latStep: 20, lonStep: 30 },
  nodeSizes: { small: 1.8, large: 4 },
  nodeColor: '#4F8EF7',

  // Connection lines — segmented/written style
  connectionStyle: 'segmented', // gaps every 4th segment
  connectionColor: 'rgba(79,142,247,0.5)',

  // Signal pulses
  pulseSpawnInterval: 260, // ms
  pulseInitialCount: 24,
  pulseColors: ['0,229,160', '79,142,247', '168,85,247'],
  pulseColorWeights: [0.42, 0.42, 0.16], // green, blue, purple
  pulseSize: 2.8,
  pulseHalo: [14, 7], // outer, inner radius
  pulseSpeed: { min: 0.006, max: 0.015 },

  // Rings
  outerRing: { radius: 213, color: 'rgba(79,142,247,0.12)', width: 1.5 },
  atmosphereRing: { radius: 222, color: 'rgba(79,142,247,0.04)', width: 3 },
  equatorialRing: { color: 'rgba(79,142,247,0.42)', width: 1 },

  // Mouse parallax
  parallax: { enabled: true, intensity: 5 }, // degrees
}
```

### 4.8 Coordinate Tag

```
18.9667° N   72.8333° E  ·  MUMBAI
Position: absolute, bottom: 20px, right: 3%
Font: JetBrains Mono, 10px
Color: #243450 (very subtle — visible on hover of that area)
Letter-spacing: 1.5px
```

---

## 5. NAVIGATION

### 5.1 Structure

```
Logo (left)                    Nav links (center)          CTA (right)

QUANTUM ATLAS                  Services  Industries         Book a Call
                               Work      Knowledge
                               About     Blog
```

### 5.2 Behavior

```
Default state:
  Background: transparent (hero shows through)
  Border-bottom: none
  Logo: Space Grotesk 600, white

Scrolled state (after 80px):
  Background: rgba(5,8,15,0.85) — backdrop-blur: 20px
  Border-bottom: 1px solid #1E2D4A
  Transition: 0.3s

Mobile:
  Hamburger menu
  Slide-in drawer from right
  Full-screen with nav links stacked
```

### 5.3 Services Dropdown

```
Hover [Services] → dropdown panel appears

┌─────────────────────────────────────────────┐
│  AI Voice Agents          Enterprise RAG    │
│  Document Intelligence    AI Automation     │
│  Custom SaaS Dev          Content & Video   │
└─────────────────────────────────────────────┘

Each item: service name (Space Grotesk 500) + one-line description
Colored left border matching service color
Background: #13192A, border: 1px solid #1E2D4A
Border-radius: 12px
```

---

## 6. HOMEPAGE — FULL STRUCTURE

### Section 1 — Hero
(See Section 4 above — fully specified)

### Section 2 — Proof Bar

```
Thin horizontal strip below hero
Background: #0D1117
Border-top + border-bottom: 1px solid #1E2D4A
Padding: 20px 0

Content: scrolling marquee of proof points
  ◆ 4 months production · Voice AI
  ◆ Government RAG deployment · Active
  ◆ 1000+ corporate clients
  ◆ $0.08 per page · Document processing
  ◆ Self-hosted · Zero vendor lock-in
  ◆ On-premise deployment · Government-ready
  ◆ 40+ years industry presence

Font: JetBrains Mono, 12px, #8896B3
Separator: ◆ in #00E5A0
Animation: continuous left scroll, 40s loop
```

### Section 3 — What We Build

```
Label: "OUR SERVICES" (eyebrow style)
H2: "The full stack. Under one roof."
Subtext: One partner for voice AI, document intelligence,
         RAG systems, and custom SaaS — so you never need
         a second vendor.

Six service cards in a 3×2 grid:

Card structure:
  ┌──────────────────────────────┐
  │ [Icon]  Service Name         │
  │ ─────────────────────────    │
  │ One line description         │
  │                              │
  │ Key proof metric             │
  │ [Learn more →]               │
  └──────────────────────────────┘

Background: #13192A
Border: 1px solid #1E2D4A
Border-top: 3px solid [service-color]
Border-radius: 12px
Hover: border-color brightens, subtle translateY(-4px)

Cards:
1. AI Voice Agents          [blue]   $0.08/min · 4mo production
2. Document Intelligence    [green]  $0.08/page · 10x faster
3. Enterprise RAG           [purple] Government-grade · On-premise
4. Custom SaaS Development  [blue]   Production-ready · Multi-tenant
5. AI Automation            [green]  15→2 staff · Internal proof
6. Content & Video          [purple] ComfyUI · Tavus · One vendor
```

### Section 4 — Why Different

```
Background: #05080F
Label: "WHY QUANTUM ATLAS"
H2: "Production proof. Not promises."

Two-column layout:
Left: Large statement text
Right: Grid of 6 proof points

Statement (left):
  "Every system we offer has been running
   in production in our own companies.
   We are our own most demanding client."

Proof points (right) — each with icon + number:
  ◆ $0.08/min   Voice AI cost — 10x below market
  ◆ $0.08/page  Document processing — 3.5x below Nanonets
  ◆ 4 months    Voice AI in production — Navbharat Shipping
  ◆ 1000+       Corporate clients — existing relationships
  ◆ ₹55L        ERP replaced — with custom-built iKargos
  ◆ 15 → 2      Staff reduction — internal automation proof

No ₹ in public-facing metrics except the ERP example
(that one is internal story context, shown as cost avoidance)
```

### Section 5 — Services Deep Dive

```
Alternating left-right layout — one per core service
Background alternates: #0D1117 / #05080F

Each block:
  Left: Content (heading, description, bullets, CTA)
  Right: Visual (animated diagram or mockup)

Service 1 — AI Voice Agents [blue]
  Heading: "Voice AI at a tenth of the cost"
  Description: Enterprise inbound and outbound voice agents
               with native Indian carrier integration.
               Self-hosted. No Twilio. No ElevenLabs.
  Bullets:
    · Airtel + Jio SIP integration
    · $0.08/minute end-to-end cost
    · RAG-powered — agents know your business
    · Grafana + Prometheus observability
    · 4 months production proven
  Visual: Animated call flow diagram

Service 2 — Document Intelligence [green]
  Heading: "Hundreds of documents. Minutes, not days."
  Description: Bulk intelligent document processing
               with domain fine-tuning. Three times cheaper
               than Nanonets. On-premise available.
  Bullets:
    · $0.08 per page — vs $0.30 at Nanonets
    · Contract clause extraction and risk flagging
    · Fine-tuned models for your document types
    · Bulk processing pipeline — hundreds in minutes
    · On-premise deployment for data sovereignty
  Visual: Animated document processing flow

Service 3 — Enterprise RAG [purple]
  Heading: "Knowledge systems governments trust"
  Description: Hybrid retrieval — BM25 + vector + graph —
               all on PostgreSQL. Citations on every answer.
               On-premise. SOC2-grade architecture.
  Bullets:
    · Hybrid retrieval — keyword + semantic + graph
    · Every answer cites the source document
    · Multi-tenant with complete data isolation
    · On-premise deployment — no data leaves your servers
    · Langfuse observability — full audit trail
  Visual: RAG pipeline diagram

Service 4 — Custom SaaS [blue]
  Heading: "Replace your ERP. Own your platform."
  Description: Production-grade multi-tenant SaaS built
               for your exact workflow. Not a template.
               Not a customized off-the-shelf product.
  Bullets:
    · Full multi-tenancy with row-level security
    · Clerk auth + Stripe billing built in
    · Self-hosted — you own everything
    · Proven: replaced a ₹55L ERP with iKargos
    · API-first — integrates with anything
  Visual: Architecture diagram
```

### Section 6 — Case Studies / Active Work

```
Background: #0D1117
Label: "ACTIVE ENGAGEMENTS"
H2: "In production. Right now."

Note: No client names without approval. Use sector + outcome.

Three cards:

Card 1 — Government RAG
  Sector: Government · Customs & Taxation
  Service: Enterprise RAG
  Status: Active Implementation
  Outcome: 40+ senior officers evaluating for IGST deployment
  Visual: Purple service color

Card 2 — Logistics Document Intelligence
  Sector: Global Logistics · Fortune 500
  Service: Document Intelligence
  Status: Production Testing Complete
  Outcome: Bulk document processing at scale — evaluated and approved
  Visual: Green service color

Card 3 — Voice AI · Shipping Operations
  Sector: Shipping & Logistics
  Service: AI Voice Agents
  Status: 4 months production
  Outcome: Inbound + outbound calls — Airtel/Jio SIP — ₹7/min
  Visual: Blue service color

Each card:
  Background: #13192A
  Border-top: 3px solid [service color]
  Status badge: "Active" / "In Production" — small pill, green
```

### Section 7 — Industries

```
Label: "INDUSTRIES WE SERVE"
H2: "Deep vertical expertise. Not generic AI."

Horizontal scrolling pill tabs:
  Government | Logistics | Fintech & BFSI | Legal | Manufacturing | Healthcare | Real Estate

Below tabs: industry-specific content panel
  Pain points addressed
  Services applicable
  Link to industry page

Default active: Government (most current active deal)
```

### Section 8 — Technical Credibility

```
Background: #05080F — dark
Label: "THE STACK"
H2: "Self-hosted. Production-proven. No dependencies."

Grid of technology logos + descriptions:
Row 1 — Infrastructure
  LiveKit (self-hosted) | PostgreSQL | Docker | Pulumi | Tailscale | Caddy

Row 2 — AI / ML
  LangGraph | n8n | LiteLLM | Langfuse | Deepgram | Jina v4

Row 3 — Data
  pgvector | ParadeDB | Apache AGE | Redis | MinIO

Each logo: subtle opacity, hover brings to full opacity
Underneath: one-line description of why each was chosen
  E.g. LiveKit: "Self-hosted WebRTC — no LiveKit Cloud dependency"
       ParadeDB: "BM25 in Postgres — no Elasticsearch needed"
```

### Section 9 — Knowledge Hub Preview

```
Background: #0D1117
Label: "KNOWLEDGE HUB"
H2: "How we think. What we've learned."

Two columns:
Left: Latest blog posts (3 cards from CMS)
Right: Featured whitepaper download

Blog cards: title, category, read time, date
Whitepaper: cover image, title, description, [Download Free] CTA
  → email gate: name + email → Resend delivers PDF → stored in Payload
```

### Section 10 — CTA Section

```
Background: #05080F
Gradient overlay: subtle blue radial from center

H2: "Ready to build something that actually works?"
Body: Not a demo. Not a PoC. A production system.
      Let us show you what we have running today.

Two CTAs:
  [Book a Discovery Call]  →  /contact (with Calendly embed)
  [See All Services]       →  /services

Subtle globe animation in background (small, low opacity)
```

### Section 11 — Footer

```
Background: #05080F
Border-top: 1px solid #1E2D4A

Logo + tagline (left)
Services column
Industries column
Company column (About, Blog, Knowledge, Contact)
Legal column (Privacy, Terms)

Bottom bar:
  © 2026 Quantum Atlas. All rights reserved.
  18.9667° N  72.8333° E  ·  MUMBAI  (right-aligned, mono, subtle)
```

---

## 7. INNER PAGES

### 7.1 Service Pages (/services/[slug])

**Six pages:**
- /services/ai-voice-agents
- /services/document-intelligence
- /services/enterprise-rag
- /services/saas-development
- /services/ai-automation
- /services/content-video

**Template structure:**

```
Section 1 — Hero (dark, #05080F)
  Service name + colored accent line
  One-line value proposition
  Key metrics (3 stats in JetBrains Mono)
  CTA: [Discuss This Service]

Section 2 — The Problem (dark grey, #0D1117)
  What the market currently does
  Why it is expensive / slow / risky
  Real numbers where possible

Section 3 — Our Approach (dark grey)
  How we do it differently
  Technical explanation — not dumbed down
  Animated process diagram

Section 4 — Proof (dark grey)
  What we have running in production
  Metrics: before / after table
  No client names without approval

Section 5 — Technical Specs (dark grey)
  Stack used
  Deployment options (cloud / on-premise)
  Integration options
  JetBrains Mono for technical values

Section 6 — Pricing Approach (light section, #F0F4FF)
  Not a full pricing page — directional
  "Starting from $X" or "Contact for enterprise pricing"
  Link to discovery call

Section 7 — FAQ (dark grey)
  5-7 questions per service
  Accordion component (shadcn/ui)
  FAQPage schema for Google rich snippets

Section 8 — Related Services
  3 cards linking to other service pages

CTA: Book a Discovery Call
```

### 7.2 Industry Pages (/industries/[slug])

**Seven pages:**
- /industries/government
- /industries/logistics-shipping
- /industries/fintech-bfsi
- /industries/legal
- /industries/manufacturing
- /industries/healthcare
- /industries/real-estate

**Template structure:**

```
Hero: Industry name + pain point statement
  Government: "AI that passes the CISO's checklist"
  Logistics: "Documents processed before the cargo lands"
  Legal: "500 contracts reviewed before the weekend"
  Fintech: "KYC in seconds. Compliance maintained."

Section 1 — Industry Challenges
  Sector-specific problems — specific, not generic

Section 2 — Services for This Industry
  Which of our 6 services apply and why
  Linked cards to service pages

Section 3 — Compliance & Requirements
  What regulations apply
  How our architecture addresses them
  On-premise deployment for data sovereignty

Section 4 — Active Work in This Sector
  Generic case card (no client name unless approved)

CTA: "[Industry]-specific discovery call"
```

### 7.3 About Page (/about)

```
Section 1 — Company Statement
  H1: "We build AI systems that outlast the people who built them."
  Body: Quantum Atlas was founded on a single principle:
        production-grade or not at all. Every system we offer
        has been running in our own companies first — handling
        real volume, real failures, and real consequences.
        We are our own most demanding client.

Section 2 — Philosophy
  Three pillars with icons:
  1. Production First — if it has not run in production, we do not sell it
  2. No Dependencies — self-hosted infrastructure, no vendor lock-in
  3. Long-term Thinking — systems built to outlast individuals

Section 3 — What We Have Built (Internal Proof)
  Timeline / stats of internal deployments:
  · iKargos — replaced ₹55L ERP — custom multi-tenant platform
  · Voice AI — 4 months production — Navbharat Shipping
  · Automation — 15-person team reduced to 2 — internal workflows
  · PowerMTA + MailWizz — 8 months production — self-configured

Section 4 — Founders (brief)
  Company-focused, not personal brand
  Brief founder bios — background, expertise
  No personal photos until Anurag decides
  Placeholder: initials-based avatar cards

Section 5 — Group Companies (context)
  Brief mention of Navbharat group — establishes 40yr credibility
  Not the main story — supporting context only

CTA: Discovery call
```

### 7.4 Blog (/blog and /blog/[slug])

**Listing page:**
```
Category tabs: All | Technical Deep Dives | AI Implementation |
               Industry Guides | Case Studies | Company
Grid: 3 columns, blog cards
  Featured image, category badge, title, excerpt, date, read time
Featured post: full-width top card
Pagination: 12 posts per page
```

**Individual post:**
```
Hero: featured image (full-width, 400px height)
  Title overlay at bottom with gradient
Meta: author + date + read time + category badge
Table of contents: sticky sidebar (desktop), accordion (mobile)
Body: Payload Lexical rich text
  Code blocks: JetBrains Mono, dark background
  Callout blocks: bordered left, accent color
  Stats: large JetBrains Mono numbers
Related posts: 3 cards at bottom
CTA: contextual to post topic
Schema: Article + FAQPage (if FAQ section present)
```

**Payload blog-posts collection:**
```typescript
{
  slug: 'blog-posts',
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText' },
    { name: 'category', type: 'select', required: true,
      options: ['technical-deep-dive', 'ai-implementation',
                'industry-guide', 'case-study', 'company'] },
    { name: 'author', type: 'relationship', relationTo: 'team-members' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedDate', type: 'date' },
    { name: 'readTime', type: 'number' },
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

### 7.5 Knowledge Hub (/knowledge)

**Four sections on one page + sub-pages:**

```
Section 1 — Whitepapers (/knowledge/whitepapers)
  Grid of whitepaper cards
  Gated: email + name required
  On submit: Resend delivers PDF + n8n adds to sequence
  CMS: whitepapers collection

  Initial whitepapers to create:
  1. Enterprise RAG Architecture Guide — On-Premise Deployment
  2. AI Voice Agent Cost Calculator for Indian Enterprises
  3. IDP vs Manual Processing — ROI Analysis Template
  4. Contract Intelligence Implementation Guide for Legal Teams
  5. Government AI Procurement — Technical Requirements Checklist

Section 2 — ROI Calculator (/knowledge/roi-calculator)
  Tab 1: Voice AI Calculator
    Inputs: calls per day, avg duration (min), current cost/min
    Output: monthly saving vs $0.08/min, annual saving, payback period
    Comparison bar: "vs VAPI + ElevenLabs" showing cost difference

  Tab 2: Document Processing Calculator
    Inputs: documents per month, avg pages per doc, current processing cost
    Output: monthly saving vs Nanonets ($0.30/page), annual saving
    Comparison: "vs Nanonets" vs "vs manual" columns

  CTA: "Share this analysis" → name + email → receives PDF summary

Section 3 — Implementation Guides
  Step-by-step guides per service
  Not gated — free access
  Topics:
    Voice AI readiness checklist
    RAG implementation requirements
    Document type coverage guide
    AI readiness self-assessment

Section 4 — Case Studies (/knowledge/case-studies)
  Only published when client approved = true in CMS
  Grid of case study cards
  Filter by industry + service
```

**Payload whitepapers collection:**
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
      options: ['voice-ai', 'idp', 'rag', 'saas', 'automation', 'content'] },
    { name: 'downloadCount', type: 'number', defaultValue: 0 },
    { name: 'publishedDate', type: 'date' },
    { name: 'gated', type: 'checkbox', defaultValue: true },
  ],
}
```

**Payload case-studies collection:**
```typescript
{
  slug: 'case-studies',
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'client', type: 'text' },
    { name: 'clientApproved', type: 'checkbox', defaultValue: false },
    { name: 'service', type: 'select', hasMany: true,
      options: ['voice-ai', 'idp', 'rag', 'saas', 'automation'] },
    { name: 'industry', type: 'select',
      options: ['government', 'logistics', 'fintech', 'legal',
                'manufacturing', 'healthcare', 'real-estate'] },
    { name: 'challenge', type: 'richText' },
    { name: 'solution', type: 'richText' },
    { name: 'outcomes', type: 'array', fields: [
      { name: 'metric', type: 'text' },
      { name: 'before', type: 'text' },
      { name: 'after', type: 'text' },
    ]},
    { name: 'techStack', type: 'array',
      fields: [{ name: 'technology', type: 'text' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
```

### 7.6 Contact / Discovery Call (/contact)

```
Two-column layout:

Left: Context
  H2: "Let's talk about what you're building"
  Body: Not a sales call. A conversation about your specific
        challenge and whether we are the right fit to solve it.
        If we are not, we will tell you.
  What to expect:
    · 30-minute call
    · We review your current state
    · We share relevant production examples
    · No obligation — we are selective about the work we take

Right: Calendly embed OR simple form
  Name, Company, Email, Phone
  Service interested in (dropdown)
  Brief description of challenge (textarea)
  [Request a Call]

Below form: Direct contact
  Email: hello@quantumatlas.ai
  Response time: within 24 hours
```

---

## 8. PAYLOAD CMS — FULL CONFIGURATION

### 8.1 Collections

**team-members:**
```typescript
{
  slug: 'team-members',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'richText' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number' },
  ],
}
```

**services:**
```typescript
{
  slug: 'services',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'color', type: 'select',
      options: ['blue', 'green', 'purple'] },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'keyMetric', type: 'text' },
    { name: 'proofPoints', type: 'array',
      fields: [{ name: 'point', type: 'text' }] },
    { name: 'order', type: 'number' },
  ],
}
```

**inquiries:**
```typescript
{
  slug: 'inquiries',
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'type', type: 'select',
      options: ['discovery-call', 'whitepaper', 'general', 'roi-calculator'] },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'service', type: 'select',
      options: ['voice-ai', 'idp', 'rag', 'saas', 'automation', 'content', 'unsure'] },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text' }, // which page/form
    { name: 'whitepaperDownloaded', type: 'relationship', relationTo: 'whitepapers' },
  ],
}
```

### 8.2 Globals

**site-settings:**
```typescript
{
  slug: 'site-settings',
  fields: [
    { name: 'siteTitle', type: 'text', defaultValue: 'Quantum Atlas' },
    { name: 'tagline', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'calendarLink', type: 'text' }, // Calendly URL
    { name: 'socialLinkedIn', type: 'text' },
    { name: 'socialTwitter', type: 'text' },
    { name: 'socialYoutube', type: 'text' },
  ],
}
```

---

## 9. SEO & PERFORMANCE

### 9.1 Metadata — Every Page

```typescript
// app/layout.tsx base metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://quantumatlas.ai'),
  title: { default: 'Quantum Atlas — Production-Grade AI', template: '%s | Quantum Atlas' },
  description: 'Enterprise AI implementation — voice agents, document intelligence, RAG systems and custom SaaS. Self-hosted. Production-proven.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Quantum Atlas',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
```

### 9.2 Structured Data

```typescript
// Homepage: Organization schema
// Service pages: Service schema
// Blog posts: Article + FAQPage
// Case studies: Article schema
// Contact: LocalBusiness schema
```

### 9.3 Performance Requirements

```
Core Web Vitals targets:
  LCP: < 2.5s (hero loads fast — canvas replaces heavy images)
  FID: < 100ms
  CLS: < 0.1

Image handling:
  All images: next/image with WebP conversion
  Proper alt text on every image
  Priority loading for above-fold images

Globe performance:
  R3F canvas throttled to 60fps
  Graceful degradation: CSS fallback if WebGL not available
  Reduced motion: static globe if prefers-reduced-motion
```

### 9.4 Sitemap & Robots

```typescript
// app/sitemap.ts — auto-generated from Payload CMS
// app/robots.ts — allow all, sitemap reference
```

---

## 10. DEPLOYMENT

### 10.1 Server Setup

```
VPS: Contabo — new server separate from NWPL and iKargos
OS: Ubuntu 24.04 LTS
Reverse proxy: Caddy (auto SSL via Let's Encrypt)
Process: PM2
Node.js: 20.9+ (Next.js 16 requirement)

Caddyfile:
quantumatlas.ai {
  reverse_proxy localhost:3000
}
quantumatlas.dev {
  redir https://quantumatlas.ai{uri} permanent
}
www.quantumatlas.ai {
  redir https://quantumatlas.ai{uri} permanent
}
```

### 10.2 Environment Variables

```bash
# Database
DATABASE_URI=postgresql://user:pass@localhost:5432/quantumatlas

# Payload CMS
PAYLOAD_SECRET=generate-32-char-random-string

# Email (Resend)
RESEND_API_KEY=re_...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-...

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...

# Site
NEXT_PUBLIC_SITE_URL=https://quantumatlas.ai
```

---

## 11. BUILD ORDER — FOLLOW EXACTLY

```
Phase 1 — Foundation (do not skip)
  □ 1.1  Initialize Next.js 16.2.2 with pnpm
  □ 1.2  Configure Tailwind CSS + shadcn/ui
  □ 1.3  Set up Payload CMS with PostgreSQL adapter
  □ 1.4  Configure all Payload collections and globals
  □ 1.5  Set up Google Fonts (Space Grotesk, Inter, JetBrains Mono)
  □ 1.6  Build design system tokens in tailwind.config.ts
  □ 1.7  Create base layout with navigation (no content yet)
  □ 1.8  Set up Framer Motion page transitions

Phase 2 — Hero Section
  □ 2.1  Install React Three Fiber + Drei
  □ 2.2  Build globe component (non-interactive first)
  □ 2.3  Add rotation + lat/lon grid lines
  □ 2.4  Add nodes + segmented connection lines
  □ 2.5  Add signal pulse animation (3 colors)
  □ 2.6  Add mouse parallax
  □ 2.7  Build hero layout — text left, globe right (right: 80px)
  □ 2.8  Add GSAP text entrance
  □ 2.9  Add stats row with counter animation
  □ 2.10 Add coordinate tag
  □ 2.11 Test on mobile — ensure globe gracefully adapts

Phase 3 — Homepage Sections
  □ 3.1  Proof bar (marquee)
  □ 3.2  Services grid (6 cards)
  □ 3.3  Why Different section
  □ 3.4  Services deep dive (alternating layout)
  □ 3.5  Active Engagements cards
  □ 3.6  Industry tabs section
  □ 3.7  Tech stack section
  □ 3.8  Knowledge hub preview
  □ 3.9  CTA section
  □ 3.10 Footer

Phase 4 — Inner Pages
  □ 4.1  Service pages (6 pages — template first, then populate)
  □ 4.2  Industry pages (7 pages — template first)
  □ 4.3  About page
  □ 4.4  Contact / Discovery call page
  □ 4.5  Blog listing + individual post template
  □ 4.6  Knowledge hub — whitepapers + ROI calculator + guides
  □ 4.7  Case studies (empty — populate when clients approve)

Phase 5 — CMS & Integrations
  □ 5.1  Payload admin — verify all collections working
  □ 5.2  Resend email integration (whitepaper delivery)
  □ 5.3  n8n webhook for form submissions
  □ 5.4  Calendly embed on contact page
  □ 5.5  Sitemap + robots.txt
  □ 5.6  Structured data on all pages

Phase 6 — Performance & Launch
  □ 6.1  Core Web Vitals audit
  □ 6.2  Mobile responsiveness — all pages
  □ 6.3  Accessibility audit
  □ 6.4  SEO metadata — all pages
  □ 6.5  Deploy to Contabo + Caddy
  □ 6.6  DNS — quantumatlas.ai + redirect quantumatlas.dev
  □ 6.7  SSL verification
  □ 6.8  Final smoke test across all pages
```

---

## 12. CONTENT RULES — NON-NEGOTIABLE

```
1. No ₹ pricing in public-facing content — USD only
2. No client names without explicit approval — use sector descriptions
3. No capability claims without production proof
4. No "AI-powered" as a standalone claim — always specify what AI does
5. No generic AI stock imagery — all visuals are custom
6. No "we help companies" — specific outcomes only
7. Every stat must have a verifiable source (internal or market data)
8. Tagline: placeholder "Built in Production. Proven at Scale."
   — update when final tagline decided — single file change
9. Copy tone: precise, technical, confident — not salesy, not humble
10. No dark patterns — honest CTAs, no fake urgency
```

---

## 13. MOBILE CONSIDERATIONS

```
Globe: On mobile (<768px), replace R3F globe with:
  Option A: Static pre-rendered image of globe
  Option B: Simplified CSS animation (no WebGL)
  Recommended: Option A — pre-render one frame, use as hero image

Navigation: Hamburger → slide-in drawer
Hero: Stack vertically — text top, globe image below (50vh)
Service cards: 1 column on mobile, 2 on tablet, 3 on desktop
Stats row: 2×2 grid on mobile
```

---

*This document is the complete specification for quantumatlas.ai*
*Claude Code agents: read this fully before writing any code*
*Do not deviate from the build order in Section 11*
*All design decisions are final — update this document if anything changes*
