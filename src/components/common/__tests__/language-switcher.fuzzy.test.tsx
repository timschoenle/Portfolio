import { test, fc } from '@fast-check/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, vi } from 'vitest'

import { LanguageSwitcher } from '../language-switcher'

// Mocks
const useLocaleMock = vi.fn().mockReturnValue('en')
const replaceMock = vi.fn()
const useRouterMock = vi.fn().mockReturnValue({ replace: replaceMock })
const usePathnameMock = vi.fn().mockReturnValue('/current-path')

vi.mock('next-intl', () => ({
  useLocale: () => useLocaleMock(),
}))

vi.mock('@/i18n/routing', () => ({
  usePathname: () => usePathnameMock(),
  useRouter: () => useRouterMock(),
}))

describe('LanguageSwitcher Fuzzy Tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
    useLocaleMock.mockReturnValue('en')
  })

  test.prop([
    fc.constantFrom('en', 'de'),
    fc.string(), // arbitrary pathname
  ])(
    'should render and switch language for any context',
    (initialLocale, pathname) => {
      cleanup()
      // Setup mocks
      useLocaleMock.mockReturnValue(initialLocale)
      usePathnameMock.mockReturnValue(pathname)

      render(<LanguageSwitcher />)

      // Verify button text
      const expectedText = initialLocale === 'en' ? '[DE]' : '[EN]'
      expect(screen.getByText(expectedText)).toBeDefined()

      // Click
      fireEvent.click(screen.getByRole('button'))

      // Verify router call
      const expectedNext = initialLocale === 'en' ? 'de' : 'en'
      expect(replaceMock).toHaveBeenCalledWith(pathname, {
        locale: expectedNext,
      })
    }
  )
})
