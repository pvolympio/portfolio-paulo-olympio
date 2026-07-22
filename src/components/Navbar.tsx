'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

const links = [
  { href: '#sobre',    label: 'Sobre'    },
  { href: '#skills',   label: 'Skills'   },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato',  label: 'Contato'  },
]

const NAV_COLORS: Record<string, string> = {
  '#sobre': 'var(--accent2)',
  '#skills': 'var(--accent2)',
  '#projetos': 'var(--accent2)',
  '#contato': 'var(--accent2)',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const currentLocale = params?.locale || 'pt'

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ScrollSpy — mark active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-80px 0px -20% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      role="navigation"
      aria-label="Navegação principal"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2rem', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(7, 7, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(105, 89, 205, 0.12)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        aria-label="Página inicial"
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22, fontWeight: 800,
          color: 'var(--accent2)',
          letterSpacing: '-0.5px',
        }}
      >
        PV<span style={{ color: 'var(--accent)', fontSize: 28 }}>.</span>
      </motion.a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text)',
          padding: 4,
          lineHeight: 0,
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {links.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            whileHover={{ color: 'var(--accent2)' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: active === l.href ? NAV_COLORS[l.href] || 'var(--muted2)' : 'var(--muted2)',
              transition: 'color 0.2s',
              position: 'relative',
            }}
          >
            <span style={{ color: 'var(--accent)', marginRight: 4, fontSize: 11 }}>
              {String(links.indexOf(l) + 1).padStart(2, '0')}.
            </span>
            {l.label}
          </motion.a>
        ))}
        <motion.a
          href="mailto:pvolympio@gmail.com"
          whileHover={{ scale: 1.04, backgroundColor: 'var(--accent)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12, padding: '8px 18px',
            border: '1px solid var(--accent)',
            borderRadius: 6,
            color: 'var(--accent2)',
            background: 'transparent',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
        >
          Email
        </motion.a>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Alternar tema"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted2)',
              display: 'flex',
              alignItems: 'center',
              padding: 4
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
          <a href="/pt" style={{ color: currentLocale === 'pt' ? 'var(--accent)' : 'var(--muted2)', fontSize: 13, fontWeight: 'bold' }}>PT</a>
          <span style={{ color: 'var(--border2)' }}>|</span>
          <a href="/en" style={{ color: currentLocale === 'en' ? 'var(--accent)' : 'var(--muted2)', fontSize: 13, fontWeight: 'bold' }}>EN</a>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              background: 'rgba(7, 7, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 32,
              zIndex: 99,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 18,
                  color: active === l.href ? 'var(--accent2)' : 'var(--muted2)',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:pvolympio@gmail.com"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16, padding: '12px 28px',
                border: '1px solid var(--accent)',
                borderRadius: 8,
                color: 'var(--accent2)',
                marginTop: 8,
              }}
            >
              Email
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Alternar tema"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted2)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 8,
                  marginTop: 16
                }}
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
