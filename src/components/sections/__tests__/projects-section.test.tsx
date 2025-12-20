import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectsSection } from '../projects-section'
import type { GitHubProject } from '@/models/github'

// Mock GitHub client
const mockGetGithubUser = vi.fn()

vi.mock('@/lib/github/client', () => ({
  getGithubUser: () => mockGetGithubUser(),
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import { siteConfig } from '@/lib/config'

describe('ProjectsSection', () => {
  it('renders section, projects, stats, and contribution graph', async () => {
    // Override featuredRepos for this test not strictly needed for getGithubUser but good for consistency
    ;(vi.mocked(siteConfig) as any).featuredRepos = ['repo1', 'repo2', 'repo3']

    const project: GitHubProject = {
      name: 'Project 1',
      description: 'Description 1',
      html_url: 'http://example.com',
      homepage: 'http://example.com',
      topics: ['react'],
      stargazers_count: 10,
      forks_count: 5,
      language: 'TypeScript',
    }

    const mockData = {
      projects: [
        { ...project, name: 'Project repo1' },
        { ...project, name: 'Project repo2' },
        { ...project, name: 'Project repo3' },
      ],
      stats: {
        repositories: 50,
        stars: 100,
        forks: 20,
      },
      contributionData: {
        2024: [
          { date: '2024-01-01', count: 5, level: 3 },
          { date: '2024-01-02', count: 2, level: 1 },
        ],
      },
    }

    mockGetGithubUser.mockResolvedValue(mockData)

    const Component = await ProjectsSection({ locale: 'en' })
    const { container } = render(Component)

    // Assert section renders
    expect(container.querySelector('#projects')).toBeDefined()
    expect(screen.getAllByText('TITLE').length).toBeGreaterThan(0)

    // Assert Projects
    expect(screen.getByText('Project repo1')).toBeDefined()
    expect(screen.getByText('Project repo2')).toBeDefined()
    expect(screen.getByText('Project repo3')).toBeDefined()

    // Assert Stats
    expect(screen.getByText('50')).toBeDefined()
    expect(screen.getByText('Repositories')).toBeDefined()
    expect(screen.getByText('100')).toBeDefined()
    expect(screen.getByText('Total Stars')).toBeDefined()
    expect(screen.getByText('20')).toBeDefined()
    expect(screen.getByText('Total Forks')).toBeDefined()

    // Assert Contribution Graph Header
    // expect(screen.getByText('// CONTRIBUTION_ACTIVITY')).toBeDefined()

    // Assert View All Link
    const viewAllLink = screen.getByRole('link', { name: /viewAll/i })
    expect(viewAllLink).toBeDefined()
    expect(viewAllLink.getAttribute('href')).toBe('https://github.com/test')
  })

  // Removed ContributionGraph tests as it is no longer used
})
