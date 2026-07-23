import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Projects from '../src/components/Projects'
import { projects } from '../src/data'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useParams: () => ({ locale: 'pt' }),
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

describe('Projects Section Conditioning', () => {
  it('should verify projects array is empty in production state', () => {
    expect(projects).toEqual([])
  })

  it('should render null from Projects component when projects array is empty', () => {
    const { container } = render(<Projects />)
    expect(container.firstChild).toBeNull()
  })
})
