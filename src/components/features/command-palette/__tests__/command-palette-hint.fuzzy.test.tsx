import { test, fc } from '@fast-check/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import { CommandPaletteHint } from '../command-palette-hint'

describe('CommandPaletteHint Fuzzy Tests', () => {
  test.prop([fc.constant(undefined)])(
    'should render with mock keyboard API',
    async () => {
      cleanup()
      // Mock navigator.keyboard
      const getLayoutMapMock = vi
        .fn()
        .mockResolvedValue(new Map([['KeyK', 'k']]))
      Object.defineProperty(navigator, 'keyboard', {
        value: {
          getLayoutMap: getLayoutMapMock,
        },
        configurable: true,
        writable: true,
      })

      // Mock userAgent to return Mac or Windows (can fuzz later, but fixed for now)
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Windows', // Defaults to "Ctrl"
        configurable: true,
      })

      render(<CommandPaletteHint />)

      // It renders asynchronously
      const hint = await screen.findByText('Ctrl+K')
      expect(hint).toBeDefined()
    }
  )

  test.prop([fc.constant(undefined)])(
    'should return null if API not supported',
    () => {
      cleanup()
      // Remove keyboard API
      Object.defineProperty(navigator, 'keyboard', {
        value: undefined,
        configurable: true,
      })

      const { container } = render(<CommandPaletteHint />)
      expect(container).toBeEmptyDOMElement()
    }
  )
})
