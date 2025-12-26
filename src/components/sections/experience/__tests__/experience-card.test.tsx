import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExperienceCard } from '../experience-card'

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  MapPin: () => <div data-testid="map-pin-icon">MapPin</div>,
}))

describe('ExperienceCard', () => {
  const mockProps = {
    achievements: ['Achievement 1', 'Achievement 2'],
    company: 'Tech Corp',
    duration: '2020 - Present',
    index: 0,
    location: 'Remote',
    role: 'Senior Engineer',
  }

  it('renders role and company', () => {
    render(<ExperienceCard {...mockProps} />)
    expect(screen.getByText('Senior Engineer')).toBeDefined()
    expect(screen.getByText('Tech Corp')).toBeDefined()
  })

  it('renders duration and location', () => {
    render(<ExperienceCard {...mockProps} />)
    expect(screen.getByText('2020 - Present')).toBeDefined()
    expect(screen.getByText('Remote')).toBeDefined()
    expect(screen.getByTestId('calendar-icon')).toBeDefined()
    expect(screen.getByTestId('map-pin-icon')).toBeDefined()
  })

  it('renders achievements list', () => {
    render(<ExperienceCard {...mockProps} />)
    expect(screen.getByText('Achievement 1')).toBeDefined()
    expect(screen.getByText('Achievement 2')).toBeDefined()
  })

  it('renders correct node label based on index', () => {
    render(<ExperienceCard {...mockProps} />)
    // BlueprintCard renders label as text
    expect(screen.getByText('EXPERIENCE_NODE_01')).toBeDefined()
  })

  it('pads index correctly for single digits', () => {
    render(<ExperienceCard {...mockProps} index={8} />)
    expect(screen.getByText('EXPERIENCE_NODE_09')).toBeDefined()
  })

  it('pads index correctly for double digits', () => {
    render(<ExperienceCard {...mockProps} index={9} />)
    expect(screen.getByText('EXPERIENCE_NODE_10')).toBeDefined()
  })
})
