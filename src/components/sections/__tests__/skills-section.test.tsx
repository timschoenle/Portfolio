import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillsSection } from '../skills/skills-section'

// Mock TechRadar component to avoid async rendering issues in tests
vi.mock('@/components/sections/tech-radar/tech-radar', () => ({
  TechRadar: vi.fn(() => <div data-testid="tech-radar-mock">TechRadar</div>),
}))

import { siteConfig } from '@/data/config'

describe('Skills_section', () => {
  beforeEach(() => {
    // Reset siteConfig to test values
    // We can modify the properties of the imported mock object directly
    Object.assign(siteConfig.skills, {
      languages: [
        { name: 'TypeScript', confidence: 0.9 },
        { name: 'Rust', confidence: 0.6 },
      ],
      frameworks: [
        { name: 'React', confidence: 0.85 },
        { name: 'Next.js', confidence: 0.8 },
      ],
      infrastructure: [
        { name: 'Docker', confidence: 0.7 },
        { name: 'Linux', confidence: 0.8 },
      ],
      buildTools: [
        { name: 'Git', confidence: 0.85 },
        { name: 'VS Code', confidence: 0.9 },
      ],
      sectionSideMinimumConfidence: 0,
      resumeMinimumConfidence: 0,
    })
  })
  it('renders section with title', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('TITLE')).toBeDefined()
  })

  it('renders languages', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('Rust')).toBeDefined()
  })

  it('renders frameworks', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Next.js')).toBeDefined()
  })

  it('renders infrastructure', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Docker')).toBeDefined()
    expect(screen.getByText('Linux')).toBeDefined()
  })

  it('renders build tools', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Git')).toBeDefined()
    expect(screen.getByText('VS Code')).toBeDefined()
  })
  it('returns empty section when skills are empty', async () => {
    // Override siteConfig mock for this test
    // Override siteConfig skills for this test
    Object.assign(siteConfig.skills, {
      languages: [],
      frameworks: [],
      infrastructure: [],
      buildTools: [],
      sectionSideMinimumConfidence: 0,
      resumeMinimumConfidence: 0,
    })

    const Component = await SkillsSection({ locale: 'en' })
    const { container } = render(Component)

    const section = container.querySelector('#skills')
    expect(section).toBeDefined()
    // It will still contain the grid layout and empty lists, but no list items
    expect(container.querySelectorAll('li').length).toBe(0)
  })
})
