'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { person } from '@/data'
import { SectionTitle } from './About'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome é muito curto'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Sua mensagem precisa ter ao menos 10 caracteres')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      
      const json = await res.json()
      
      if (res.ok) {
        setSuccessMsg(json.message || 'Mensagem enviada com sucesso!')
        reset()
      } else {
        setErrorMsg(json.error || 'Erro ao enviar a mensagem.')
      }
    } catch (err) {
      setErrorMsg('Erro de rede ao conectar com o servidor.')
    } finally {
      setSubmitting(false)
    }
  }

  const links = [
    { label: 'GitHub',   href: person.github,   Icon: Github,   user: 'pvolympio'                },
    { label: 'LinkedIn', href: person.linkedin,  Icon: Linkedin, user: 'pauloolympio-desenvolvedor'},
  ]

  return (
    <section id="contato" style={{ padding: '8rem 0 6rem', position: 'relative' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(105,89,205,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" ref={ref}>
        <SectionTitle label="Vamos conversar" title="Contato" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: 24, padding: '4rem',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}
          className="glow-border"
        >
          {/* Top decorative gradient */}
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '60%', height: 1,
            background: 'linear-gradient(90deg, transparent, var(--accent2), transparent)',
          }} />

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--accent)', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840', display: 'inline-block', boxShadow: '0 0 8px #28c840' }} />
            disponível para oportunidades
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '-1px', marginBottom: 16,
          }}>
            Vamos construir algo{' '}
            <span className="shimmer-text">juntos</span>
          </h3>

          <p style={{
            color: 'var(--muted2)', fontSize: 16,
            maxWidth: 480, margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Seja para uma vaga, projeto freelance ou só uma conversa técnica — pode chamar!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500, margin: '0 auto 48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="name" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>Nome</label>
              <input {...register('name')} id="name" style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15 }} placeholder="Seu nome" />
              {errors.name && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{errors.name.message}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="email" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>E-mail</label>
              <input {...register('email')} id="email" type="email" style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15 }} placeholder="seu@email.com" />
              {errors.email && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{errors.email.message}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              <label htmlFor="message" style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 600 }}>Mensagem</label>
              <textarea {...register('message')} id="message" rows={4} style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: 15 }} placeholder="Como posso ajudar?" />
              {errors.message && <span style={{ color: '#ff4a4a', fontSize: 12 }}>{errors.message.message}</span>}
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02, boxShadow: '0 0 20px rgba(105,89,205,0.3)' } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              style={{
                padding: '16px 24px', background: submitting ? 'var(--bg2)' : 'var(--accent)', color: submitting ? 'var(--muted)' : '#fff', 
                border: '1px solid var(--accent)', borderRadius: 10, fontWeight: 700, fontSize: 16, 
                cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginTop: 12, fontFamily: 'var(--font-body)', transition: 'all 0.2s'
              }}
            >
              {submitting ? 'Enviando...' : <><Mail size={18} /> Enviar Mensagem</>}
            </motion.button>
          </form>

          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#28c840', background: 'rgba(40,200,64,0.1)', padding: 16, borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
              {successMsg}
            </motion.div>
          )}
          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#ff4a4a', background: 'rgba(255,74,74,0.1)', padding: 16, borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
              {errorMsg}
            </motion.div>
          )}

          <div style={{
            display: 'flex', gap: 16,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {links.map(({ label, href, Icon, user }, i) => (
              <motion.a
                key={label}
                href={href} target="_blank"
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{
                  scale: 1.04,
                  borderColor: 'var(--accent)',
                  backgroundColor: 'rgba(105,89,205,0.08)',
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 22px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  color: 'var(--text)',
                  transition: 'all 0.2s',
                  minWidth: 200,
                }}
              >
                <Icon size={18} style={{ color: 'var(--accent2)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--muted)', marginTop: 2,
                  }}>
                    {user.length > 28 ? user.slice(0, 28) + '…' : user}
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
