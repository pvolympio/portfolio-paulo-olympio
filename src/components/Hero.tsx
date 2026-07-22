'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { person } from '@/data'

const roles = ['Backend Developer', 'Fullstack Developer', 'Arquiteto de Software', 'Problem Solver']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = roles[roleIdx]
    const speed = deleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), 2200)
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        } else {
          setDeleting(false)
          setRoleIdx(r => (r + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx])

  const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

  return (
    <section
      id="home"
      aria-label="Apresentação principal"
      style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', alignItems: 'center',
        padding: '0 2rem',
      }}
    >
      {/* Radial glow center */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(105,89,205,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ width: '100%', paddingTop: 80 }}>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden" animate="show"
        >
          {/* Mono tag */}
          <motion.div variants={fade} transition={{ duration: 0.6 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13,
              color: 'var(--accent2)',
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 28,
            }}>
              <span style={{
                width: 32, height: 1,
                background: 'var(--accent)', display: 'inline-block',
              }} />
              Olá, mundo. Eu sou
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fade} transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-3px',
              marginBottom: 16,
              color: '#fff',
            }}
          >
            Paulo<br />
            <span className="shimmer-text">Victor</span>{' '}
            <span style={{ color: 'var(--bg3)', WebkitTextStroke: '2px var(--accent)' }}>
              Olympio
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={fade} transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: 'var(--muted2)',
              marginBottom: 28,
              minHeight: '2rem',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>{'> '}</span>
            {displayed}
            <span style={{
              display: 'inline-block', width: 2, height: '1.2em',
              background: 'var(--accent)', marginLeft: 2,
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fade} transition={{ duration: 0.6 }}
            style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: 20,
              color: 'var(--muted)',
              fontSize: 16,
              fontStyle: 'italic',
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: 44,
            }}
          >
            "{person.tagline}"
          </motion.blockquote>

          {/* CTAs */}
          <motion.div
            variants={fade} transition={{ duration: 0.6 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
          >
            <motion.a
              href="#projetos"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(105,89,205,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px',
                background: 'var(--accent)',
                color: '#fff', borderRadius: 8,
                fontWeight: 600, fontSize: 15,
                transition: 'all 0.2s',
              }}
            >
              Ver Projetos
            </motion.a>
            <motion.a
              href={person.github} target="_blank"
              whileHover={{ scale: 1.04, borderColor: 'var(--accent2)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px',
                border: '1px solid var(--border2)',
                color: 'var(--accent2)', borderRadius: 8,
                fontWeight: 600, fontSize: 15,
                background: 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <Github size={16} /> GitHub
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fade} transition={{ duration: 0.6 }}
            style={{ display: 'flex', gap: 20, alignItems: 'center' }}
          >
            {[
              { href: person.github,   Icon: Github,   label: 'GitHub'   },
              { href: person.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${person.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label} href={href} target="_blank"
                title={label}
                whileHover={{ scale: 1.2, color: 'var(--accent2)' }}
                style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
            <span style={{
              width: 1, height: 40,
              background: 'var(--border2)',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12, color: 'var(--muted)',
              writingMode: 'vertical-rl',
            }}>
              scroll down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: 'var(--accent)' }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Big decorative number */}
      <div style={{
        position: 'absolute', right: '-2%', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(120px, 18vw, 260px)',
        fontWeight: 800, lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(105,89,205,0.12)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        BE
      </div>
    </section>
  )
}
