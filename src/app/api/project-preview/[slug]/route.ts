import { NextResponse } from 'next/server'
import { projectSources } from '@/data/project-sources'
import { parseProjectSource, humanizeSlug } from '@/lib/projects/validation'
import { generateFallbackSvg } from '@/lib/projects/preview'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  if (!slug) {
    return new NextResponse('Slug é obrigatório', { status: 400 })
  }

  // Find matching project in local config
  const matchedSource = projectSources.find((source) => {
    try {
      const parsed = parseProjectSource(source)
      return parsed.slug === slug
    } catch {
      return false
    }
  })

  if (!matchedSource) {
    return new NextResponse('Projeto não encontrado', { status: 404 })
  }

  const parsed = parseProjectSource(matchedSource)
  const title = humanizeSlug(parsed.slug)
  const host = new URL(parsed.demoUrl).hostname

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    // Call Microlink screenshot API securely
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(parsed.demoUrl)}&screenshot=true&embed=screenshot.url`
    const imgRes = await fetch(microlinkUrl, {
      signal: controller.signal,
      next: { revalidate: 86400 }
    }).catch(() => null)

    clearTimeout(timeoutId)

    if (imgRes && imgRes.ok) {
      const contentType = imgRes.headers.get('content-type') || 'image/jpeg'
      const imageBuffer = await imgRes.arrayBuffer()

      if (imageBuffer.byteLength > 1000) {
        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      }
    }
  } catch {
    // Fallback to SVG on screenshot service error
  }

  // Local SVG Fallback
  const svg = generateFallbackSvg(title, host)
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
