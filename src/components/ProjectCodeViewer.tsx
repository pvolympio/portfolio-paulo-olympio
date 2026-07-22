'use client'

import Editor from '@monaco-editor/react'
import { useState } from 'react'

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
  const editorOptions = {
    theme: 'vs-dark',
    fontSize: 14,
    lineNumbers: 'on' as const,
    minimap: { enabled: false },
    readOnly: true,
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false,
  }

  return (
    <section style={{ marginBottom: '48px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Cabeçalho */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: '#fff',
          margin: 0
        }}>
          {title}
        </h3>
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              color: 'var(--accent2)',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
          >
            Ver no GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <path d="M15 3h6v6"></path>
              <path d="M10 14V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6"></path>
            </svg>
          </a>
        )}
      </div>

      {/* Editor de código */}
      <div style={{ height: '320px' }}>
        <Editor
          height="100%"
          width="100%"
          language={language.toLowerCase()} // ex: 'java', 'javascript', 'python'
          value={code}
          options={editorOptions}
        />
      </div>
    </section>
  )
}