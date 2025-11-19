import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
}))

// Mock next-intl/navigation
vi.mock('next-intl/navigation', () => ({
  createNavigation: vi.fn(() => ({
    Link: () => null,
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
  })),
}))

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getRequestConfig: (fn: any) => fn,
}))

// Mock routing
vi.mock('./routing', () => ({
  routing: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
}))

describe('request configuration', () => {
  it('exports configuration', async () => {
    const config = await import('../request')
    expect(config.default).toBeDefined()
  })
})
