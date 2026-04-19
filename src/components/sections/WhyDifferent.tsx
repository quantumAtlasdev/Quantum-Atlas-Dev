'use client'
import { motion } from 'framer-motion'

const proofPoints = [
  { value: '$0.08/min', label: 'Voice AI cost — 10x below market', color: '#00E5A0' },
  { value: '$0.08/page', label: 'Document processing — 3.5x below Nanonets', color: '#FFBF00' },
  { value: '4 months', label: 'Voice AI in production — Navbharat Shipping', color: '#00E5A0' },
  { value: '1000+', label: 'Corporate clients — existing relationships', color: '#FFBF00' },
  { value: 'ERP replaced', label: 'Custom-built iKargos platform from scratch', color: '#A855F7' },
  { value: '15 → 2', label: 'Staff reduction — internal automation proof', color: '#00E5A0' },
]

export function WhyDifferent() {
  return (
    <section
      className="py-24 px-6 lg:px-8"
      style={{ background: '#05080F' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-quantum-green text-[11px] tracking-[3px] uppercase mb-12"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Quantum Atlas
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Production proof.<br />Not promises.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Every system we offer has been running in production
              in our own companies. We are our own most demanding client.
            </p>
          </motion.div>

          {/* Right: proof points grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {proofPoints.map((pt, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 p-4 rounded-lg border border-space-border"
                style={{ background: '#0D1117' }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: pt.color, fontFamily: 'var(--font-mono)' }}
                >
                  ◆ {pt.value}
                </span>
                <span className="text-text-secondary text-sm">{pt.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
