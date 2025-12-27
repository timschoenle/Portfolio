import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialCard, type TestimonialItem } from '../testimonial-card'

// Mock next/image to behave like a simple img
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Quote: () => <div data-testid="quote-icon">Quote</div>,
}))

describe('TestimonialCard', () => {
  const mockItem: TestimonialItem = {
    company: 'Tech Corp',
    image: '/avatar.jpg',
    name: 'John Doe',
    quote: 'Great service!',
    role: 'Engineer',
  }

  it('renders all fields correctly', () => {
    render(<TestimonialCard item={mockItem} />)

    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
    expect(screen.getByText('Tech Corp')).toBeDefined()
    expect(screen.getByText(/“Great service!”/)).toBeDefined()
    expect(screen.getByTestId('quote-icon')).toBeDefined()
  })

  it('renders image with correct alt text', () => {
    render(<TestimonialCard item={mockItem} />)
    const img = screen.getByRole('img', { name: 'John Doe avatar' })
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toBe('/avatar.jpg')
  })

  it('uses placeholder if image is empty string', () => {
    const itemWithoutImage = { ...mockItem, image: '' }
    render(<TestimonialCard item={itemWithoutImage} />)
    const img = screen.getByRole('img', { name: 'John Doe avatar' })
    expect(img.getAttribute('src')).toBe('/placeholder.svg')
  })
})
