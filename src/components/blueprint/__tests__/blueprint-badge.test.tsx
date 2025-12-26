import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { BlueprintBadge } from '../blueprint-badge'

// Mock skill icons
vi.mock('@/components/sections/skills/skill-icons', () => ({
  getSkillIcon: () => () => <div data-testid="skill-icon" />,
}))

describe('BlueprintBadge', () => {
  it('renders standard badge with label', () => {
    render(<BlueprintBadge label="React" variant="standard" />)
    expect(screen.getByText('React')).toBeDefined()
  })

  it('renders bracket variant correctly', () => {
    render(<BlueprintBadge label="Architecture" variant="bracket" />)
    expect(screen.getByText('Architecture')).toBeDefined()
    expect(screen.getByText('[')).toBeDefined()
    expect(screen.getByText(']')).toBeDefined()
  })

  it('renders with icon when iconName is provided', () => {
    render(<BlueprintBadge iconName="React" label="React" />)
    expect(screen.getByTestId('skill-icon')).toBeDefined()
  })
})
