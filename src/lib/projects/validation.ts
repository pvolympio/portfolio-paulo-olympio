import { z } from 'zod'
import { projectSources } from '@/data/project-sources'
import { ProjectSource, ParsedProjectSource } from './types'

function cleanPathname(pathname: string): string {
  let clean = pathname.trim()
  if (clean.endsWith('/')) clean = clean.slice(0, -1)
  if (clean.endsWith('.git')) clean = clean.slice(0, -4)
  if (clean.endsWith('/')) clean = clean.slice(0, -1)
  return clean
}

export const githubUrlSchema = z.string().trim().refine((url) => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    if (parsed.hostname !== 'github.com') return false

    const clean = cleanPathname(parsed.pathname)
    const parts = clean.split('/').filter(Boolean)
    return parts.length >= 2
  } catch {
    return false
  }
}, { message: 'Invalid GitHub repository URL. Must be HTTPS on github.com with owner/repo.' })

export const demoUrlSchema = z.string().trim().refine((url) => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname)) return false
    if (['file:', 'ftp:', 'javascript:'].includes(parsed.protocol)) return false
    return parsed.hostname.length > 0
  } catch {
    return false
  }
}, { message: 'Invalid public demo URL. Must be HTTPS public URL.' })

export const projectSourceSchema = z.object({
  githubUrl: githubUrlSchema,
  demoUrl: demoUrlSchema,
})

export function parseProjectSource(source: ProjectSource): ParsedProjectSource {
  const validation = projectSourceSchema.safeParse(source)
  if (!validation.success) {
    throw new Error(`Project source configuration error for (${source.githubUrl || 'empty'} / ${source.demoUrl || 'empty'}): ${validation.error.message}`)
  }

  const rawGithub = new URL(source.githubUrl.trim())
  const clean = cleanPathname(rawGithub.pathname)
  const parts = clean.split('/').filter(Boolean)
  const owner = parts[0]
  const repo = parts[1]
  const slug = `${owner}-${repo}`.toLowerCase()

  const rawDemo = new URL(source.demoUrl.trim())
  const cleanDemoUrl = `${rawDemo.protocol}//${rawDemo.host}${rawDemo.pathname.replace(/\/$/, '')}`

  return {
    owner,
    repo,
    slug,
    githubUrl: `https://github.com/${owner}/${repo}`,
    demoUrl: cleanDemoUrl,
  }
}

export function humanizeSlug(slug: string): string {
  const repoName = slug.includes('-') && slug.split('-').length >= 2
    ? slug.split('-').slice(1).join('-')
    : slug

  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

export function hasConfiguredProjects(): boolean {
  if (!projectSources || projectSources.length === 0) {
    return false
  }

  return projectSources.some((source) => {
    if (!source || !source.githubUrl || !source.demoUrl) return false
    return projectSourceSchema.safeParse(source).success
  })
}
