import { useEffect } from 'react'

import { type Locale } from 'next-intl'

import { handlePaletteKey } from './key-handlers'
import { type LocalizedRouter } from '../utils/actions'

interface UsePaletteNavigationProperties {
  readonly locale: Locale
  readonly open: boolean
  readonly pathname: string
  readonly router: LocalizedRouter
  readonly run: (function_: () => void) => void
}

export const usePaletteNavigation: (
  properties: UsePaletteNavigationProperties
) => void = ({
  locale,
  open,
  pathname,
  router,
  run,
}: UsePaletteNavigationProperties): void => {
  useEffect((): (() => void) | undefined => {
    if (!open) {
      return
    }

    const handleKeyDown: (event: KeyboardEvent) => void = (
      event: KeyboardEvent
    ): void => {
      // Ignore if user is typing in an input
      if (
        event.target instanceof HTMLElement &&
        (event.target.tagName === 'INPUT' ||
          event.target.tagName === 'TEXTAREA' ||
          event.target.isContentEditable)
      ) {
        return
      }

      const key: string = event.key.toUpperCase()

      const handleRequest: (action: (value: string) => void) => void = (
        action: (value: string) => void
      ): void => {
        event.preventDefault()
        action('')
      }

      handlePaletteKey(key, { locale, pathname, router, run }, handleRequest)
    }

    document.addEventListener('keydown', handleKeyDown)
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [locale, open, pathname, router, run])
}
