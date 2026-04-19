'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { GlobeWrapper } from '@/components/globe/GlobeWrapper'

gsap.registerPlugin()

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 })
        .from(
          headlineRef.current ? Array.from(headlineRef.current.children) : [],
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.15 },
          '-=0.4',
        )
        .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(
          ctasRef.current ? Array.from(ctasRef.current.children) : [],
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3',
        )
        .from(statsRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: '#05080F',
        backgroundImage:
          'radial-gradient(ellipse at 68% 50%, #091422 0%, #05080F 60%)',
      }}
    >
      {/* Left content */}
      <div className="relative z-10 pl-[6%] max-w-[390px]">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-2 mb-6">
          <span
            className="w-[6px] h-[6px] rounded-full bg-quantum-green"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span
            className="text-quantum-green uppercase tracking-[3px] text-[11px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Quantum Atlas · AI Infrastructure
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <span
            className="block text-[44px] font-bold leading-[1.08] text-text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built in
          </span>
          <span
            className="block text-[44px] font-bold leading-[1.08] text-text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Production.
          </span>
          <span
            className="block text-[44px] font-bold leading-[1.08] text-electric-blue whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Proven at Scale.
          </span>
        </div>

        {/* Subheadline */}
        <p
          ref={subtitleRef}
          className="text-[15px] text-text-secondary leading-[1.72] mb-8"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          AI systems that run in the real world —{' '}
          voice agents, document intelligence,{' '}
          knowledge systems and custom SaaS.{' '}
          Self-hosted. Enterprise-grade.
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className="flex items-center gap-3 mb-10 flex-wrap">
          <Link
            href="/contact"
            className="px-[28px] py-[13px] rounded-[6px] bg-electric-blue text-white text-[14px] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/services"
            className="px-[28px] py-[13px] rounded-[6px] bg-transparent text-text-secondary border border-space-border text-[14px] font-semibold hover:border-electric-blue hover:text-text-primary transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            See Our Work →
          </Link>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="flex items-center flex-wrap">
          <StatItem value="$0.08" label="Per page · IDP" color="quantum-green" showDivider={false} />
          <StatItem value="4 mo" label="Voice · Live" color="electric-blue" />
          <StatItem value="1000+" label="Corporate clients" color="text-primary" />
          <StatItem value="Govt" label="RAG · Active" color="electric-blue" />
        </div>
      </div>

      {/* Globe — right side */}
      <div
        className="absolute"
        style={{
          right: '80px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <GlobeWrapper />
      </div>

      {/* Coordinate tag */}
      <div
        className="absolute bottom-5 text-[10px] tracking-[1.5px] select-none"
        style={{
          right: '3%',
          color: '#243450',
          fontFamily: 'var(--font-mono)',
        }}
      >
        18.9667° N · 72.8333° E · MUMBAI
      </div>
    </section>
  )
}

// ─── Stat Item ────────────────────────────────────────────────────────────────

interface StatItemProps {
  value: string
  label: string
  color: string
  showDivider?: boolean
}

function StatItem({ value, label, color, showDivider = true }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-stretch gap-0">
      {showDivider && (
        <div className="w-px bg-space-border mx-4 self-stretch min-h-[36px]" />
      )}
      <div className="flex flex-col">
        <span
          className={`text-[18px] font-bold text-${color}`}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {value}
        </span>
        <span
          className="text-[10px] text-text-secondary"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
