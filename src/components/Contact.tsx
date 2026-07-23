'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { person } from '@/data'
import { SectionTitle } from './About'

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(5).max(2000),
  website: z.string().optional() // Honeypot field
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const t = useTranslations('contact')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitting, setSubmitting] = useState(false)
  const [statusState, setStatusState] = useState<'idle' | 'success' | 'validation_error' | 'unavailable' | 'error'>('idle')
  const [serverMsg, setServerMsg] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setStatusState('idle')
    setServerMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      if (res.status === 503) {
        setStatusState('unavailable')
        setServerMsg(t('error503Desc'))
      } else if (res.ok) {
        setStatusState('success')
        setServerMsg(t('success'))
        reset()
      } else if (res.status === 400) {
        setStatusState('validation_error')
        setServerMsg(json.error || t('errorValidation'))
      } else {
        setStatusState('error')
        setServerMsg(t('errorUnexpected'))
      }
    } catch (err) {
      setStatusState('error')
      setServerMsg(t('errorUnexpected'))
    } finally {
      setSubmitting(false)
    }
  }

  const links = [
    { label: 'GitHub', href: person.github, Icon: Github, user: 'pvolympio' },
    { label: 'LinkedIn', href: person.linkedin, Icon: Linkedin, user: 'pauloolympio-desenvolvedor' },
    { label: 'E-mail', href: `mailto:${person.email}`, Icon: Mail, user: person.email },
  ]

  return (
    <section id="contato" style={{ padding: '8rem 0 6rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(105,89,205,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" ref={ref}>
        <SectionTitle label={t('label')} title={t('title')} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: 24, padding: '3.5rem 2rem',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}
          className="glow-border"
        >
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '60%', height: 1,
            background: 'linear-gradient(90deg, transparent, var(--accent2), transparent)',
          }} />

          <p style={{
            color: 'var(--muted2)', fontSize: 16,
            maxWidth: 520, margin: '0 auto 36px',
            lineHeight: 1.7,
          }}>
            {t('subtitle')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500, margin: '0 auto 36px' }}>
            {/* Honeypot field (hidden from view) */}
            <input type="text" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} {...register('website')} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="contact-name" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>
                {t('nameLabel')}
              </label>
              <input
                {...register('name')}
                id="contact-name"
                disabled={submitting}
                style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--text)', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: 15
                }}
                placeholder={t('namePlaceholder')}
              />
              {errors.name && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{t('errorValidation')}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="contact-email" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>
                {t('emailLabel')}
              </label>
              <input
                {...register('email')}
                id="contact-email"
                type="email"
                disabled={submitting}
                style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--text)', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: 15
                }}
                placeholder={t('emailPlaceholder')}
              />
              {errors.email && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{t('errorValidation')}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="contact-message" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>
                {t('messageLabel')}
              </label>
              <textarea
                {...register('message')}
                id="contact-message"
                rows={4}
                disabled={submitting}
                style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--text)', outline: 'none', resize: 'vertical',
                  fontFamily: 'var(--font-body)', fontSize: 15
                }}
                placeholder={t('messagePlaceholder')}
              />
              {errors.message && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{t('errorValidation')}</span>}
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02, boxShadow: '0 0 20px rgba(105,89,205,0.3)' } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              style={{
                padding: '16px 24px', background: submitting ? 'var(--bg2)' : 'var(--accent)',
                color: submitting ? 'var(--muted)' : '#fff',
                border: '1px solid var(--accent)', borderRadius: 10, fontWeight: 700, fontSize: 16,
                cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginTop: 12, fontFamily: 'var(--font-body)', transition: 'all 0.2s'
              }}
            >
              {submitting ? t('sendingButton') : <><Mail size={18} /> {t('sendButton')}</>}
            </motion.button>
          </form>

          {/* Status Region */}
          <div aria-live="polite" aria-atomic="true" style={{ maxWidth: 500, margin: '0 auto 32px' }}>
            {statusState === 'success' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#28c840', background: 'rgba(40,200,64,0.1)', border: '1px solid rgba(40,200,64,0.2)', padding: 16, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 14 }}>
                <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                <span>{serverMsg}</span>
              </motion.div>
            )}

            {statusState === 'unavailable' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#eab308', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)', padding: 16, borderRadius: 10, textAlign: 'left', fontSize: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, marginBottom: 6 }}>
                  <AlertCircle size={20} />
                  <span>{t('error503Title')}</span>
                </div>
                <p style={{ margin: 0, lineHeight: 1.5, opacity: 0.9 }}>{serverMsg}</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href={`mailto:${person.email}`} style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>
                    {t('directEmail')} ({person.email})
                  </a>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent2)', fontWeight: 600, textDecoration: 'underline' }}>
                    {t('linkedIn')}
                  </a>
                </div>
              </motion.div>
            )}

            {(statusState === 'error' || statusState === 'validation_error') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#ff4a4a', background: 'rgba(255,74,74,0.1)', border: '1px solid rgba(255,74,74,0.2)', padding: 16, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 14 }}>
                <AlertCircle size={20} />
                <span>{serverMsg}</span>
              </motion.div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {links.map(({ label, href, Icon, user }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.04, borderColor: 'var(--accent)', backgroundColor: 'rgba(105,89,205,0.08)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 22px', background: 'var(--bg2)',
                  border: '1px solid var(--border)', borderRadius: 12,
                  color: 'var(--text)', transition: 'all 0.2s', minWidth: 180,
                }}
              >
                <Icon size={18} style={{ color: 'var(--accent2)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                    {user.length > 24 ? user.slice(0, 24) + '…' : user}
                  </div>
                </div>
                <ArrowUpRight size={14} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
