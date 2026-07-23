'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; pulse: number; pulseSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isReducedMotion = mediaQuery.matches

    let animId: number
    let particles: Particle[] = []
    let gridCache: HTMLCanvasElement | null = null
    let isPaused = false

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gridCache = null
      init()
      if (isReducedMotion) {
        drawFrame()
      }
    }

    const drawGrid = () => {
      if (!gridCache || gridCache.width !== canvas.width || gridCache.height !== canvas.height) {
        gridCache = document.createElement('canvas')
        gridCache.width = canvas.width
        gridCache.height = canvas.height
        const gridCtx = gridCache.getContext('2d')
        if (gridCtx) {
          gridCtx.strokeStyle = 'rgba(139, 124, 245, 0.04)'
          gridCtx.lineWidth = 1
          const gridSize = 80
          for (let x = 0; x < canvas.width; x += gridSize) {
            gridCtx.beginPath(); gridCtx.moveTo(x, 0); gridCtx.lineTo(x, canvas.height); gridCtx.stroke()
          }
          for (let y = 0; y < canvas.height; y += gridSize) {
            gridCtx.beginPath(); gridCtx.moveTo(0, y); gridCtx.lineTo(canvas.width, y); gridCtx.stroke()
          }
        }
      }
      ctx.drawImage(gridCache, 0, 0)
    }

    const init = () => {
      particles = []
      // Scaled particle count (max 25 on mobile, max 50 on desktop)
      const isMobile = window.innerWidth < 768
      const maxParticles = isMobile ? 25 : 50
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 25000),
        maxParticles
      )

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.005,
        })
      }
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()

      const MAX_DIST = window.innerWidth < 768 ? 90 : 120
      const MAX_DIST_SQ = MAX_DIST * MAX_DIST

      particles.forEach((p, i) => {
        if (!isReducedMotion) {
          p.pulse += p.pulseSpeed
        }
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 124, 245, ${alpha})`
        ctx.fill()

        // Connection lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const distSq = dx * dx + dy * dy
          if (distSq < MAX_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139, 124, 245, ${0.1 * (1 - dist / MAX_DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        if (!isReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        }
      })
    }

    const loop = () => {
      if (!isPaused && !isReducedMotion) {
        drawFrame()
        animId = requestAnimationFrame(loop)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true
        cancelAnimationFrame(animId)
      } else {
        isPaused = false
        if (!isReducedMotion) {
          loop()
        }
      }
    }

    resize()
    if (!isReducedMotion) {
      loop()
    } else {
      drawFrame()
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.8 }}
    />
  )
}
