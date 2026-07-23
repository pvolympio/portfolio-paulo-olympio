'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { hasConfiguredProjects } from '@/lib/projects/validation'

export default function Navbar() {
  const tNav = useTranslations('nav')
  const tAccess = useTranslations('accessibility')
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = (params?.locale as string) || 'pt'

  const showProjects = hasConfiguredProjects()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape key press & return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

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

  // Navigation items — conditionally include Projects link ONLY when valid project sources exist
  const navItems = [
    { href: '#sobre', label: tNav('about') },
    { href: '#skills', label: tNav('skills') },
    ...(showProjects ? [{ href: '#projetos', label: tNav('projects') }] : []),
    { href: '#contato', label: tNav('contact') },
  ]

  const switchLanguage = (newLocale: string) => {
    const currentHash = typeof window !== 'undefined' ? window.location.hash : ''
    // Replace locale prefix in path
    const pathWithoutLocale = pathname.replace(/^\/(pt|en)/, '')
    const targetPath = `/${newLocale}${pathWithoutLocale || ''}${currentHash}`
    router.push(targetPath)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2rem', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <nav
        role="navigation"
        aria-label="Navegação principal"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Logo */}
        <motion.a
          href={`/${currentLocale}`}
          aria-label="Página inicial"
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22, fontWeight: 800,
            color: 'var(--accent2)',
            letterSpacing: '-0.5px',
            textDecoration: 'none'
          }}
        >
          PV<span style={{ color: 'var(--accent)', fontSize: 28 }}>.</span>
        </motion.a>

        {/* Mobile menu toggle */}
        <button
          ref={menuButtonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text)',
            padding: 8,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links & Controls */}
        <div className="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navItems.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ color: 'var(--accent2)' }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: active === item.href ? 'var(--accent2)' : 'var(--muted2)',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: 'var(--accent)', marginRight: 4, fontSize: 11 }}>
                {String(idx + 1).padStart(2, '0')}.
              </span>
              {item.label}
            </motion.a>
          ))}

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={tAccess('themeToggle')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted2)',
                display: 'flex',
                alignItems: 'center',
                padding: 6,
                borderRadius: 6,
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Language Switcher */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            <button
              onClick={() => switchLanguage('pt')}
              aria-label="Mudar para Português"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: currentLocale === 'pt' ? 'var(--accent)' : 'var(--muted2)',
                padding: 2
              }}
            >
              PT
            </button>
            <span style={{ color: 'var(--border)' }}>|</span>
            <button
              onClick={() => switchLanguage('en')}
              aria-label="Switch to English"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: currentLocale === 'en' ? 'var(--accent)' : 'var(--muted2)',
                padding: 2
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
                background: 'var(--bg)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 28,
                zIndex: 99,
                padding: '2rem'
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 20,
                    color: active === item.href ? 'var(--accent2)' : 'var(--text)',
                    textDecoration: 'none'
                  }}
                >
                  {item.label}
                </a>
              ))}

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label={tAccess('themeToggle')}
                    style={{
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      cursor: 'pointer',
                      color: 'var(--text)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 10
                    }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                )}

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  <button
                    onClick={() => { setMenuOpen(false); switchLanguage('pt'); }}
                    style={{ background: 'none', border: 'none', color: currentLocale === 'pt' ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer' }}
                  >
                    PT
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => { setMenuOpen(false); switchLanguage('en'); }}
                    style={{ background: 'none', border: 'none', color: currentLocale === 'en' ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer' }}
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
