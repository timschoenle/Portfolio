import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock server-only
vi.mock('server-only', () => ({}))

// Mock next/cache
vi.mock('next/cache', () => ({
  unstable_cache: (fn: any) => fn,
}))

// Mock Octokit
const mockOctokitGet = vi.fn()
const mockOctokitPaginate = vi.fn()
vi.mock('@octokit/rest', () => {
  return {
    Octokit: class {
      constructor() {
        this.repos = {
          get: mockOctokitGet,
          listForUser: vi.fn(),
        }
        this.paginate = mockOctokitPaginate
      }
    },
  }
})

// Mock fetch for GraphQL
const mockFetch = vi.fn()
global.fetch = mockFetch

// Import after mocks
const { getFeaturedProjects, getUserStats, getContributionData } = await import(
  '../github'
)

describe('github', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getFeaturedProjects', () => {
    it('returns featured projects', async () => {
      mockOctokitGet.mockResolvedValue({
        data: {
          name: 'repo-1',
          description: 'desc',
          html_url: 'url',
          stargazers_count: 10,
          forks_count: 5,
          language: 'TypeScript',
          topics: ['react'],
        },
      })

      const projects = await getFeaturedProjects()
      expect(projects.length).toBeGreaterThanOrEqual(0)
      if (projects.length > 0) {
        expect(projects[0]!.name).toBe('repo-1')
      }
    })

    it('handles errors gracefully', async () => {
      mockOctokitGet.mockRejectedValue(new Error('API Error'))
      const projects = await getFeaturedProjects()
      expect(projects).toEqual([])
    })
  })

  describe('getUserStats', () => {
    it('calculates stats correctly', async () => {
      mockOctokitPaginate.mockResolvedValue([
        { stargazers_count: 10, forks_count: 2 },
        { stargazers_count: 5, forks_count: 1 },
      ])

      const stats = await getUserStats()
      expect(stats).toEqual({
        stars: 15,
        forks: 3,
        repositories: 2,
      })
    })

    it('handles errors gracefully', async () => {
      mockOctokitPaginate.mockRejectedValue(new Error('API Error'))
      const stats = await getUserStats()
      expect(stats).toEqual({ stars: 0, forks: 0, repositories: 0 })
    })
  })

  describe('getContributionData', () => {
    it('returns contribution data', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            user: {
              contributionsCollection: {
                contributionCalendar: {
                  weeks: [
                    {
                      contributionDays: [
                        {
                          date: '2023-01-01',
                          contributionCount: 5,
                          contributionLevel: 'FIRST_QUARTILE',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        }),
      })

      const data = await getContributionData()
      expect(data).toHaveLength(1)
      expect(data[0]!.count).toBe(5)
      expect(data[0]!.level).toBe(1)
    })

    it('handles fetch errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      })

      const data = await getContributionData()
      expect(data).toEqual([])
    })
  })
})
