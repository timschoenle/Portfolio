import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '../testimonials-section'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const t: any = (key: string) => key
    t.raw = (key: string) => {
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
    }
    t.rich = (key: string) => key
    t.markup = (key: string) => key
    t.has = () => true
    return t
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
      const t: any = (key: string) => key
      t.raw = (_key: string) => []
      t.rich = (key: string) => key
      t.markup = (key: string) => key
      t.has = () => true
      return t
    })

    const Component = await TestimonialsSection({ locale: 'en' })
    const { container } = render(Component)

    const section = container.querySelector('#testimonials')
    expect(section).toBeDefined()
    expect(section?.children.length).toBe(0)
  })
})
