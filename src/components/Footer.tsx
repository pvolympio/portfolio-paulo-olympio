'use client'
import { person } from '@/data'

export default function Footer() {
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
        © {new Date().getFullYear()} Paulo Victor Olympio — Feito com lógica e impacto.
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: 'var(--accent)',
      }}>
        Next.js + Framer Motion
      </span>
    </footer>
  )
}
