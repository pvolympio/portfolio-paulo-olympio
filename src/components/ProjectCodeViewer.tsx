'use client'

import { useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'

interface ProjectCodeViewerProps {
  code: string
  language: string
  title: string
  githubLink?: string
}

export default function ProjectCodeViewer({
  code,
  language,
  title,
  githubLink
}: ProjectCodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split('\n')

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'var(--bg3)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent2)', textTransform: 'uppercase', background: 'rgba(105,89,205,0.1)', padding: '2px 8px', borderRadius: 4 }}>
            {language}
          </span>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
            {title}
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={handleCopy}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 12 }}
            aria-label="Copiar código"
          >
            {copied ? <Check size={14} style={{ color: '#28c840' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: 'var(--accent2)', textDecoration: 'none'
              }}
            >
              GitHub <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Lightweight Code Container */}
      <div style={{ padding: '16px', overflowX: 'auto', maxHeight: 300, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
        <pre style={{ margin: 0, display: 'table', width: '100%' }}>
          <code>
            {lines.map((line, idx) => (
              <div key={idx} style={{ display: 'table-row' }}>
                <span style={{ display: 'table-cell', userSelect: 'none', paddingRight: 16, color: 'var(--muted)', textAlign: 'right', opacity: 0.5, fontSize: 12 }}>
                  {idx + 1}
                </span>
                <span style={{ display: 'table-cell', whiteSpace: 'pre' }}>
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}