import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../about/about-section'

import { getTranslations } from 'next-intl/server'

describe('AboutSection', () => {
  beforeEach(() => {
    vi.mocked(getTranslations).mockImplementation(async () => {
      const t: any = (key: string) => {
        if (key === 'competenciesLabel') return 'Key Competencies'
        return key
      }
      t.rich = (key: string, options?: any) => {
        if (options?.highlight) return options.highlight(`highlighted-${key}`)
        return key
      }
      t.raw = (key: string) => (key === 'competencies' ? ['Java', 'Rust'] : [])
      return t
    })
  })
  it('renders section with title', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('TITLE')).toBeDefined()
  })

  it('renders summary content', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    // The summary is rendered via the rich() call
    expect(screen.getByText('highlighted-summary')).toBeDefined()
  })

  //   it('renders competency badges', async () => {
  //     const Component = await AboutSection({ locale: 'en' })
  //     render(Component)

  //     expect(screen.getByText('Backend Architecture')).toBeDefined()
  //     // ... other assertions
  //   })

  it('renders Key Competencies heading', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Key Competencies')).toBeDefined()
  })
})
