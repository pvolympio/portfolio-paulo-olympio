import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getProjects } from '@/lib/projects/get-projects'
import { hasConfiguredProjects } from '@/lib/projects/validation'
import { SectionTitle } from './About'

export default async function Projects({ locale }: { locale: string }) {
  if (!hasConfiguredProjects()) {
    return null
  }

  const projects = await getProjects(locale)
  if (!projects || projects.length === 0) {
    return null
  }

  const t = await getTranslations({ locale, namespace: 'projects' })

  return (
    <section id="projetos" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="section-container">
        <SectionTitle label={t('label')} title={t('title')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32
        }}>
          {projects.map((project) => (
            <article
              key={project.slug}
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              className="project-card"
            >
              {/* Preview Image Container (16:9 aspect ratio) */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
                <Image
                  src={project.previewUrl}
                  alt={project.previewAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: 16 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: 0
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: 'var(--muted2)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1
                }}>
                  {project.description}
                </p>

                {/* Technologies list */}
                {project.technologies && project.technologies.length > 0 && (
                  <ul
                    aria-label={t('technologies')}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        style={{
                          fontSize: 12,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent2)',
                          background: 'rgba(105,89,205,0.1)',
                          border: '1px solid rgba(139,124,245,0.2)',
                          padding: '3px 10px',
                          borderRadius: 6,
                        }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 18px',
                      background: 'var(--accent)',
                      color: '#fff',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{t('viewProject')}</span>
                    <ExternalLink size={14} aria-hidden="true" />
                    <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
                      {t('newTabNotice')}
                    </span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 18px',
                      background: 'transparent',
                      border: '1px solid var(--border2)',
                      color: 'var(--accent2)',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Github size={14} aria-hidden="true" />
                    <span>{t('viewCode')}</span>
                    <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
                      {t('newTabNotice')}
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}