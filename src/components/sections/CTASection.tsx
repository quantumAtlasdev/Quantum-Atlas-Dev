'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section
      className="py-32 px-6 lg:px-8 text-center relative overflow-hidden"
      style={{
        background: '#05080F',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(255,191,0,0.08) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to build something<br />that actually works?
          </h2>
          <p className="text-text-secondary text-lg mb-10 leading-relaxed">
            Not a demo. Not a PoC. A production system.
            Let us show you what we have running today.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 hover:scale-[1.02] transition-all text-base"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-lg border border-space-border text-text-secondary hover:border-electric-blue hover:text-text-primary transition-all text-base font-medium"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              See All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
