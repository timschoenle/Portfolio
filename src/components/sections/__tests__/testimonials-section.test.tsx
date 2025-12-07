import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '../testimonials-section'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    return Object.assign((key: string) => key, {
      raw: (key: string) => {
        if (key === 'items') {
          return [
            {
              name: 'John Doe',
              role: 'CEO',
              company: 'Tech Corp',
              image: '/avatar.jpg',
              quote: 'Great work!',
            },
          ]
        }
        return key
      },
    })
  }),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Quote: () => <div data-testid="quote-icon">Quote</div>,
}))

describe('TestimonialsSection', () => {
  it('renders section with title', async () => {
    const Component = await TestimonialsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('title')).toBeDefined()
  })

  it('renders testimonial items', async () => {
    const Component = await TestimonialsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('CEO')).toBeDefined()
    expect(screen.getByText('Tech Corp')).toBeDefined()
  })
  it('returns empty section when testimonials are empty', async () => {
    // Override translation returning empty array
    vi.mocked(
      await import('next-intl/server')
    ).getTranslations.mockImplementationOnce(async () => {
      return Object.assign((key: string) => key, {
        raw: (key: string) => [],
      })
    })

    const Component = await TestimonialsSection({ locale: 'en' })
    const { container } = render(Component)

    const section = container.querySelector('#testimonials')
    expect(section).toBeDefined()
    expect(section?.children.length).toBe(0)
  })
})
