'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills, Skill } from '@/data'
import { SectionTitle } from './About'
import { useTranslations } from 'next-intl'

export default function Skills() {
  const t = useTranslations('skills')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const categories: Array<{ id: Skill['category']; title: string }> = [
    { id: 'backend', title: t('backend') },
    { id: 'database', title: t('database') },
    { id: 'devops', title: t('devops') },
    { id: 'frontend', title: t('frontend') },
  ]

  return (
    <section id="skills" style={{
      padding: '8rem 0', position: 'relative',
      background: 'linear-gradient(180deg, transparent 0%, rgba(105,89,205,0.03) 50%, transparent 100%)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: '100%',
        background: 'linear-gradient(180deg, transparent, rgba(105,89,205,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" ref={ref}>
        <SectionTitle label={t('label')} title={t('title')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter((s) => s.category === cat.id)
            if (catSkills.length === 0) return null

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 18,
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--accent2)',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 10
                }}>
                  {cat.title}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {catSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.03, borderColor: 'var(--accent)' }}
                      style={{
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '8px 14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <span style={{ fontSize: 18, lineHeight: 1 }}>{skill.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
