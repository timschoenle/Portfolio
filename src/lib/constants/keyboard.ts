/**
 * Keyboard shortcut configuration for the command palette
 * Single source of truth - change here to update everywhere
 *
 * @example
 * To change from Ctrl+K to Shift+P:
 * - Change key: 'K' to key: 'P'
 * - Change default: 'Ctrl' to default: 'Shift'
 */
export const COMMAND_PALETTE_SHORTCUT: {
  readonly key: string
  readonly modifiers: {
    readonly default: string
    readonly mac: string
  }
} = {
  key: 'K',
  modifiers: {
    default: 'Ctrl', // Windows/Linux
    mac: 'Cmd',
  },
} as const

type ModifierEventKey = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'

/**
 * Get the keyboard event property name for a modifier
 */
export const getModifierEventKey: (modifier: string) => ModifierEventKey = (
  modifier: string
): ModifierEventKey => {
  if (modifier === 'Ctrl') {
    return 'ctrlKey'
  }
  if (modifier === 'Cmd') {
    return 'metaKey'
  }
  if (modifier === 'Shift') {
    return 'shiftKey'
  }
  if (modifier === 'Alt') {
    return 'altKey'
  }
  throw new Error(`Unknown modifier: ${modifier}`)
}

/**
 * Check if a modifier key is pressed on a keyboard event
 * Clean, type-safe alternative to manual if-else chains
 */
export const isModifierPressed: (
  event: KeyboardEvent,
  modifier: string
) => boolean = (event: KeyboardEvent, modifier: string): boolean => {
  const eventKey: ModifierEventKey = getModifierEventKey(modifier)

  // Use explicit checks instead of bracket notation for security
  if (eventKey === 'ctrlKey') {
    return event.ctrlKey
  }
  if (eventKey === 'metaKey') {
    return event.metaKey
  }
  if (eventKey === 'shiftKey') {
    return event.shiftKey
  }
  return event.altKey
}

/**
 * Get the appropriate modifier for the current OS
 */
export const getOSModifier: () => string = (): string => {
  if (typeof navigator === 'undefined') {
    return COMMAND_PALETTE_SHORTCUT.modifiers.default
  }

  const userAgent: string = navigator.userAgent
  const isMac: boolean = /Mac|iPhone|iPod|iPad/i.test(userAgent)

  return isMac
    ? COMMAND_PALETTE_SHORTCUT.modifiers.mac
    : COMMAND_PALETTE_SHORTCUT.modifiers.default
}
