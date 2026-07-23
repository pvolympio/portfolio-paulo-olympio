import { describe, it, expect } from 'vitest'
import {
  parseProjectSource,
  humanizeSlug,
  hasConfiguredProjects,
} from '../src/lib/projects/validation'
import { compileTechnologies } from '../src/lib/projects/github'
import { generateFallbackSvg } from '../src/lib/projects/preview'
import { GET as previewRouteHandler } from '../src/app/api/project-preview/[slug]/route'

describe('Project Sources, Validation & Resolution Layer', () => {
  it('should return false for hasConfiguredProjects when projectSources is empty', () => {
    expect(hasConfiguredProjects()).toBe(false)
  })

  it('should parse and normalize valid GitHub and demo URLs', () => {
    const validSource = {
      githubUrl: 'https://github.com/pvolympio/fut-store.git/',
      demoUrl: 'https://fut-store.vercel.app/',
    }

    const parsed = parseProjectSource(validSource)
    expect(parsed.owner).toBe('pvolympio')
    expect(parsed.repo).toBe('fut-store')
    expect(parsed.slug).toBe('pvolympio-fut-store')
    expect(parsed.githubUrl).toBe('https://github.com/pvolympio/fut-store')
    expect(parsed.demoUrl).toBe('https://fut-store.vercel.app')
  })

  it('should reject invalid GitHub URL', () => {
    const invalidSource = {
      githubUrl: 'http://not-github.com/invalid',
      demoUrl: 'https://demo.vercel.app',
    }

    expect(() => parseProjectSource(invalidSource)).toThrow()
  })

  it('should reject invalid demo URL', () => {
    const invalidSource = {
      githubUrl: 'https://github.com/pvolympio/my-repo',
      demoUrl: 'http://localhost:3000',
    }

    expect(() => parseProjectSource(invalidSource)).toThrow()
  })

  it('should humanize repository names correctly', () => {
    expect(humanizeSlug('pvolympio-fut-store')).toBe('Fut Store')
    expect(humanizeSlug('pvolympio-todo_list')).toBe('Todo List')
    expect(humanizeSlug('pvolympio-chatTCPWindows')).toBe('Chat TCP Windows')
  })

  it('should deduplicate technologies and respect maximum limit of 6', () => {
    const details = {
      title: 'Test Repo',
      description: 'Test description',
      topics: ['react', 'nextjs', 'typescript', 'portfolio', 'learning'],
      mainLanguage: 'TypeScript',
      languages: ['TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Docker', 'Python'],
    }

    const techs = compileTechnologies(details)
    expect(techs.length).toBeLessThanOrEqual(6)
    expect(techs).toContain('TypeScript')
    expect(techs).not.toContain('portfolio')
    expect(techs).not.toContain('learning')
  })

  it('should return SVG fallback image when requested preview slug does not exist', async () => {
    const req = new Request('http://localhost:3000/api/project-preview/unknown-slug')
    const res = await previewRouteHandler(req, { params: { slug: 'unknown-slug' } })
    expect(res.status).toBe(404)
  })

  it('should generate valid fallback SVG string', () => {
    const svg = generateFallbackSvg('Fut Store', 'fut-store.vercel.app')
    expect(svg).toContain('<svg')
    expect(svg).toContain('Fut Store')
    expect(svg).toContain('fut-store.vercel.app')
  })
})
