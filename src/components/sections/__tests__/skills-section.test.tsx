import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillsSection } from '../skills-section'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}))

// Mock config
vi.mock('@/lib/config', () => ({
  siteConfig: {
    skills: {
      expertise: [
        { name: 'TypeScript', confidence: 0.9 },
        { name: 'React', confidence: 0.85 },
        { name: 'Next.js', confidence: 0.8 },
      ],
      learning: [
        { name: 'Rust', confidence: 0.6 },
        { name: 'Go', confidence: 0.5 },
      ],
      tools: [
        { name: 'Git', confidence: 0.85 },
        { name: 'Docker', confidence: 0.7 },
        { name: 'VS Code', confidence: 0.9 },
      ],
      platforms: [{ name: 'Linux', confidence: 0.8 }],
    },
  },
}))

describe('Skills_section', () => {
  it('renders section with title', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('title')).toBeDefined()
  })

  it('renders expertise skills', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getAllByText(/expertise/i)[0]).toBeDefined()
    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Next.js')).toBeDefined()
  })

  it('renders learning skills', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getAllByText(/learning/i)[0]).toBeDefined()
    expect(screen.getByText('Rust')).toBeDefined()
    expect(screen.getByText('Go')).toBeDefined()
  })

  it('renders tools', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getAllByText(/tools/i)[0]).toBeDefined()
    expect(screen.getByText('Git')).toBeDefined()
    expect(screen.getByText('Docker')).toBeDefined()
    expect(screen.getByText('VS Code')).toBeDefined()
  })

  it('renders platforms', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getAllByText(/platforms/i)[0]).toBeDefined()
    expect(screen.getByText('Linux')).toBeDefined()
  })
})
