'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/data'
import { SectionTitle } from './About'
import ProjectCodeViewer from './ProjectCodeViewer'
import { useTranslations } from 'next-intl'

export default function Projects() {
  const t = useTranslations('projects')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Non-negotiable requirement: Hide section completely when projects array is empty
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section id="projetos" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="section-container" ref={ref}>
        <SectionTitle label={t('label')} title={t('title')} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((project, i) => {
            const realCode = project.codeSnippet || '// Código do projeto'
            const language = project.language || 'javascript'

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01, borderColor: 'var(--accent)' }}
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: 18,
                  padding: '2rem 2.5rem',
                  display: 'grid',
                  gridTemplateColumns: project.featured ? '1fr' : '1fr auto',
                  gap: '1.5rem',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, var(--accent) ${i * 25}%, var(--accent2) 100%)`
                }} />

                <div style={{
                  position: 'absolute',
                  right: 24, top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 80, fontWeight: 800,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(105,89,205,0.1)',
                  userSelect: 'none', lineHeight: 1
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <ProjectCodeViewer
                  title={project.title}
                  language={language}
                  code={realCode}
                  githubLink={project.github}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}