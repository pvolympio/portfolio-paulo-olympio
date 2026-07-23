import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Projects from '../src/components/Projects'
import { hasConfiguredProjects } from '../src/lib/projects/validation'
import { projectSources } from '../src/data/project-sources'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useParams: () => ({ locale: 'pt' }),
}))

vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'pt' }),
  usePathname: () => '/pt',
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}))

describe('Projects Component & Nav Conditioning', () => {
  it('should verify hasConfiguredProjects matches projectSources state', () => {
    const isConfigured = hasConfiguredProjects()
    expect(isConfigured).toBe(projectSources.length > 0)
  })

  it('should render Projects section when projectSources has valid projects', async () => {
    if (projectSources.length > 0) {
      const Component = await Projects({ locale: 'pt' })
      expect(Component).not.toBeNull()
    }
  })
})
