import { type Dispatch, type SetStateAction, useEffect } from 'react'

interface UseCommandShortcutsProperties {
  readonly setOpen: Dispatch<SetStateAction<boolean>>
}

export const useCommandShortcuts: (
  properties: UseCommandShortcutsProperties
) => void = ({ setOpen }: UseCommandShortcutsProperties): void => {
  useEffect((): (() => void) => {
    const down: (event: KeyboardEvent) => void = (
      event: KeyboardEvent
    ): void => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current: boolean): boolean => !current)
      }
    }

    document.addEventListener('keydown', down)
    return (): void => {
      document.removeEventListener('keydown', down)
    }
  }, [setOpen])
}
