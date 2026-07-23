'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 18, fontWeight: 800,
        color: 'var(--accent2)',
      }}>
        PV<span style={{ color: 'var(--accent)', fontSize: 22 }}>.</span>
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: 'var(--muted)',
      }}>
        © {new Date().getFullYear()} Paulo Victor Olympio. {t('rights')}
      </span>
      <a
        href="#home"
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--accent)', textDecoration: 'none'
        }}
      >
        ↑ {t('backToTop')}
      </a>
    </footer>
  )
}
