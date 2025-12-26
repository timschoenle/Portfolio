import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlueprintProjectCard } from '../project-card'

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Folder: () => <div data-testid="folder-icon">Folder</div>,
  GitFork: () => <div data-testid="fork-icon">Fork</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
}))

describe('BlueprintProjectCard', () => {
  const mockProps = {
    description: 'A cool project',
    language: 'TypeScript',
    name: 'Project Alpha',
    stats: {
      forks: 5,
      stars: 10,
    },
    url: 'https://github.com/test/project',
    viewProject: 'View Project',
  }

  it('renders project details correctly', () => {
    render(<BlueprintProjectCard {...mockProps} />)

    expect(screen.getByText('Project Alpha')).toBeDefined()
    expect(screen.getByText('A cool project')).toBeDefined()
    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('View Project ->')).toBeDefined()
  })

  it('renders stats', () => {
    render(<BlueprintProjectCard {...mockProps} />)

    expect(screen.getByText('10')).toBeDefined() // Stars
    expect(screen.getByText('5')).toBeDefined() // Forks
    expect(screen.getByTestId('star-icon')).toBeDefined()
    expect(screen.getByTestId('fork-icon')).toBeDefined()
  })

  it('renders link with correct href', () => {
    render(<BlueprintProjectCard {...mockProps} />)
    const link = screen.getByRole('link', { name: /view project ->/i })
    expect(link.getAttribute('href')).toBe('https://github.com/test/project')
    expect(link.getAttribute('target')).toBe('_blank')
  })
})
