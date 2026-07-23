'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { person } from '@/data'
import { useTranslations } from 'next-intl'

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 3,
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
      }}>
        <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
        {label}
      </span>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800, color: 'var(--text)',
        letterSpacing: '-1.5px', margin: 0
      }}>
        {title}
      </h2>
      <div style={{ width: 48, height: 3, background: 'var(--accent)', borderRadius: 2, marginTop: 12 }} />
    </div>
  )
}

export { SectionTitle }

export default function About() {
  const t = useTranslations('about')
  const tHero = useTranslations('hero')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { num: 'BE', label: t('specialtyLabel') },
    { num: 'FE', label: 'Fullstack' },
    { num: 'REST', label: 'APIs & Services' },
    { num: '∞', label: 'Clean Code' },
  ]

  return (
    <section id="sobre" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="section-container" ref={ref}>
        <SectionTitle label={t('label')} title={t('title')} />

        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              color: 'var(--muted2)', lineHeight: 1.85,
              fontSize: 16, marginBottom: 20,
            }}>
              {t('p1')}
            </p>
            <p style={{
              color: 'var(--muted2)', lineHeight: 1.85,
              fontSize: 16, marginBottom: 20,
            }}>
              {t('p2')}
            </p>

            <motion.a
              href="#contato"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(105,89,205,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 20, padding: '12px 28px',
                background: 'var(--accent)',
                color: '#fff', borderRadius: 8,
                fontWeight: 600, fontSize: 14, textDecoration: 'none'
              }}
            >
              {tHero('ctaContact')} →
            </motion.a>
          </motion.div>

          {/* Right: stat cards & terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              marginBottom: 24,
            }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  whileHover={{ scale: 1.03, borderColor: 'var(--accent)' }}
                  style={{
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: 14, padding: '1.25rem',
                    textAlign: 'center',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32, fontWeight: 800,
                    color: 'var(--accent2)',
                  }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 14, overflow: 'hidden',
              }}
            >
              <div style={{
                background: 'var(--bg3)',
                padding: '10px 16px',
                display: 'flex', gap: 7, alignItems: 'center',
                borderBottom: '1px solid var(--border)',
              }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginLeft: 8 }}>
                  paulo@dev ~
                </span>
              </div>
              <div style={{ padding: '1rem 1.25rem' }}>
                {[
                  { cmd: 'whoami', out: 'paulo-victor-olympio' },
                  { cmd: 'role', out: 'Backend & Fullstack Developer' },
                  { cmd: 'stack', out: 'Java, Node.js, TypeScript, SQL, Docker' },
                  { cmd: 'status', out: '🟢 Available' }
                ].map((line, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                      <span style={{ color: 'var(--accent2)' }}>{'$ '}</span>
                      <span style={{ color: 'var(--text)' }}>{line.cmd}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted2)', paddingLeft: 16 }}>
                      {line.out}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
