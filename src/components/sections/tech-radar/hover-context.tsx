'use client'

import React, {
  type Context,
  createContext,
  type JSX,
  useContext,
  useMemo,
  useState,
} from 'react'

import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

export interface HoverContextValue {
  hoveredBlip: string | null
  setHoveredBlip: (blipId: string | null) => void
}

const HoverContext: Context<HoverContextValue | null> =
  createContext<HoverContextValue | null>(null)

export const useHover: () => HoverContextValue = (): HoverContextValue => {
  const context: HoverContextValue | null = useContext(HoverContext)
  if (context === null) {
    throw new Error('useHover must be used within HoverProvider')
  }
  return context
}

/**
 * Provider for managing shared hover state between blips and tooltip.
 */
export const HoverProvider: FCWithRequiredChildren<WithRequiredChildren> = ({
  children,
}: WithRequiredChildren): JSX.Element => {
  const [hoveredBlip, setHoveredBlip]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = useState<string | null>(null)

  const value: HoverContextValue = useMemo(
    (): HoverContextValue => ({ hoveredBlip, setHoveredBlip }),
    [hoveredBlip]
  )

  return <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
}
