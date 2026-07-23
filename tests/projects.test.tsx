import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Projects from '../src/components/Projects'
import { hasConfiguredProjects } from '../src/lib/projects/validation'

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
  it('should verify hasConfiguredProjects is false when projectSources is empty', () => {
    expect(hasConfiguredProjects()).toBe(false)
  })

  it('should render null from Projects component when no projects are configured', async () => {
    const Component = await Projects({ locale: 'pt' })
    expect(Component).toBeNull()
  })
})
