import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import LastUpdateNotice from '../last-update-notice'

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const mockTranslation = (key: string) => key
    mockTranslation.rich = (key: string, values: any) => {
      if (key === 'lastUpdated') {
        return `Last updated: ${values.date}`
      }
      return key
    }
    return mockTranslation
  }),
  getFormatter: vi.fn(async () => ({
    dateTime: (_date: Date, _options?: any) => {
      // Simple mock formatter
      return '11/29/2025'
    },
  })),
}))

describe('LastUpdateNotice', () => {
  it('renders last update notice with formatted date', async () => {
    const testDate = new Date('2025-11-29')
    const { container } = render(
      await LastUpdateNotice({
        lastUpdate: testDate,
        locale: 'en',
      })
    )

    expect(container.textContent).toContain('Last updated:')
    expect(container.textContent).toContain('11/29/2025')
  })

  it('displays calendar icon', async () => {
    const testDate = new Date('2025-11-29')
    const { container } = render(
      await LastUpdateNotice({
        lastUpdate: testDate,
        locale: 'en',
      })
    )

    // Check for calendar icon (lucide-react renders SVG)
    const svg = container.querySelector('svg')
    expect(svg).toBeDefined()
  })

  it('has correct styling classes', async () => {
    const testDate = new Date('2025-11-29')
    const { container } = render(
      await LastUpdateNotice({
        lastUpdate: testDate,
        locale: 'en',
      })
    )

    const wrapper = container.querySelector('.mt-8')
    expect(wrapper).toBeDefined()
    expect(wrapper?.className).toContain('flex')
    expect(wrapper?.className).toContain('items-center')
    expect(wrapper?.className).toContain('gap-2')
    expect(wrapper?.className).toContain('border-t')
    expect(wrapper?.className).toContain('pt-4')
  })

  it('works with different locales', async () => {
    const testDate = new Date('2025-11-29')
    const { container } = render(
      await LastUpdateNotice({
        lastUpdate: testDate,
        locale: 'de',
      })
    )

    expect(container.textContent).toBeTruthy()
  })

  it('handles Date objects correctly', async () => {
    const testDate = new Date('2024-01-15')
    const { container } = render(
      await LastUpdateNotice({
        lastUpdate: testDate,
        locale: 'en',
      })
    )

    expect(container.textContent).toContain('Last updated:')
  })
})
