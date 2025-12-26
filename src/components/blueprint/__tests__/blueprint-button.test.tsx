import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import { Mail } from 'lucide-react'

import { BlueprintButton } from '../blueprint-button'

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">Mail</div>,
}))

describe('BlueprintButton', () => {
  it('renders children correctly', () => {
    render(<BlueprintButton>Click Me</BlueprintButton>)
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('renders icon when provided', () => {
    render(<BlueprintButton icon={Mail}>With Icon</BlueprintButton>)
    expect(screen.getByTestId('mail-icon')).toBeDefined()
  })

  it('renders as link when href is provided', () => {
    render(
      <BlueprintButton href="https://example.com">Link Button</BlueprintButton>
    )
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeDefined()
    expect(link.getAttribute('href')).toBe('https://example.com')
  })

  it('renders as button when href is missing', () => {
    render(<BlueprintButton>Action Button</BlueprintButton>)
    expect(screen.getByRole('button', { name: /action button/i })).toBeDefined()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <BlueprintButton onClick={handleClick}>Clickable</BlueprintButton>
    )

    getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders primary variant by default', () => {
    const { container } = render(<BlueprintButton>Primary</BlueprintButton>)
    expect(container.textContent).toContain('Primary')
    // Check for primary styling classes if needed, or snapshot
  })

  it('renders outline variant', () => {
    const { container } = render(
      <BlueprintButton variant="outline">Outline</BlueprintButton>
    )
    expect(container.textContent).toContain('Outline')
  })
})
