import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import { Mail } from 'lucide-react'

import { BlueprintItem } from '../blueprint-item'

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">Mail</div>,
}))

describe('BlueprintItem', () => {
  it('renders label and icon', () => {
    render(<BlueprintItem href="#" icon={<Mail />} label="Email" />)
    expect(screen.getByText('Email')).toBeDefined()
    expect(screen.getByTestId('mail-icon')).toBeDefined()
  })

  it('renders subLabel when provided', () => {
    render(
      <BlueprintItem
        href="#"
        icon={<Mail />}
        label="Email"
        subLabel="test@example.com"
      />
    )
    expect(screen.getByText('test@example.com')).toBeDefined()
  })

  it('renders as link with correct href', () => {
    render(
      <BlueprintItem
        href="mailto:test@example.com"
        icon={<Mail />}
        label="Email"
      />
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('mailto:test@example.com')
  })
})
