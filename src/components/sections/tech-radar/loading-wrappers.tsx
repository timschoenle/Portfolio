'use client'

import { type ComponentType } from 'react'

import dynamic from 'next/dynamic'

import type * as TechRadarInteractiveModule from './tech-radar-interactive'
import type * as TechRadarTooltipModule from './tech-radar-tooltip'

export const DynamicTechRadarInteractive: ComponentType<TechRadarInteractiveModule.TechRadarInteractiveProperties> =
  dynamic(
    async (): Promise<
      ComponentType<TechRadarInteractiveModule.TechRadarInteractiveProperties>
    > =>
      import('./tech-radar-interactive').then(
        (
          module_: typeof TechRadarInteractiveModule
        ): ComponentType<TechRadarInteractiveModule.TechRadarInteractiveProperties> =>
          module_.TechRadarInteractive
      ),
    {
      ssr: false,
    }
  )

export const DynamicTechRadarTooltip: ComponentType<TechRadarTooltipModule.TechRadarTooltipProperties> =
  dynamic(
    async (): Promise<
      ComponentType<TechRadarTooltipModule.TechRadarTooltipProperties>
    > =>
      import('./tech-radar-tooltip').then(
        (
          module_: typeof TechRadarTooltipModule
        ): ComponentType<TechRadarTooltipModule.TechRadarTooltipProperties> =>
          module_.TechRadarTooltip
      ),
    {
      ssr: false,
    }
  )
