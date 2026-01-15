import { test, fc } from '@fast-check/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, vi } from 'vitest'

import { ThemeToggle } from '../theme-toggle'

// Mock the useTheme hook (default: light)
const setThemeMock = vi.fn()
const useThemeMock = vi.fn().mockReturnValue({
  setTheme: setThemeMock,
  theme: 'light',
})

vi.mock('@/components/common/theme-provider', () => ({
  useTheme: () => useThemeMock(),
}))

describe('ThemeToggle Fuzzy Tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
    useThemeMock.mockReturnValue({
      setTheme: setThemeMock,
      theme: 'light',
    })
  })

  test.prop([fc.constantFrom('light', 'dark', 'system')])(
    'should render and toggle theme for any initial state',
    (initialTheme) => {
      cleanup()
      // Setup mock with fuzzed initial theme
      useThemeMock.mockReturnValue({
        setTheme: setThemeMock,
        theme: initialTheme,
      })

      render(<ThemeToggle />)

      // Verify button exists
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toBeDefined()

      // Interactions
      fireEvent.click(button)

      // Verify setTheme was called with the correct next theme
      const expectedNext = initialTheme === 'light' ? 'dark' : 'light'
      expect(setThemeMock).toHaveBeenCalledWith(expectedNext)
    }
  )
})
