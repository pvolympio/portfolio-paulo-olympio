'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '@/data'
import { SectionTitle } from './About'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" style={{
      padding: '8rem 0', position: 'relative',
      background: 'linear-gradient(180deg, transparent 0%, rgba(105,89,205,0.03) 50%, transparent 100%)',
    }}>
      {/* Decorative line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: '100%',
        background: 'linear-gradient(180deg, transparent, rgba(105,89,205,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" ref={ref}>
        <SectionTitle label="Tecnologias" title="Skills" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 14,
        }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 24px rgba(105,89,205,0.35)',
                borderColor: 'var(--accent)',
              }}
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 14, padding: '1.4rem 1rem',
                textAlign: 'center',
                cursor: 'default',
                transition: 'border-color 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Level bar at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: 2,
                width: `${skill.level}%`,
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                borderRadius: '0 2px 0 0',
              }} />

              <div style={{ fontSize: 28, marginBottom: 10 }}>{skill.icon}</div>
              <div style={{
                fontWeight: 600, fontSize: 14, color: 'var(--text)',
                marginBottom: 4,
              }}>
                {skill.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--accent)',
              }}>
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big decorative text */}
        <div style={{
          textAlign: 'center', marginTop: 80,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(60px, 10vw, 140px)',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(105,89,205,0.1)',
          userSelect: 'none',
          letterSpacing: '-4px',
        }}>
          BACKEND
        </div>
      </div>
    </section>
  )
}
