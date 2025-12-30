'use client'

import { type ComponentType } from 'react'

import dynamic from 'next/dynamic'

import type * as CommandPaletteModule from '@/components/features/command-palette/command-palette-hint'
import type * as ScrollSnapModule from '@/components/features/scroll-snap/scroll-snap-pair-controller'

export const DynamicCommandPaletteHint: ComponentType = dynamic(
  async (): Promise<ComponentType> =>
    import('@/components/features/command-palette/command-palette-hint').then(
      (module_: typeof CommandPaletteModule): ComponentType =>
        module_.CommandPaletteHint
    ),
  { ssr: false }
)

export const DynamicScrollSnapPairController: ComponentType<ScrollSnapModule.ScrollSnapPairControllerProperties> =
  dynamic(
    async (): Promise<
      ComponentType<ScrollSnapModule.ScrollSnapPairControllerProperties>
    > =>
      import('@/components/features/scroll-snap/scroll-snap-pair-controller').then(
        (
          module_: typeof ScrollSnapModule
        ): ComponentType<ScrollSnapModule.ScrollSnapPairControllerProperties> =>
          module_.ScrollSnapPairController
      ),
    { ssr: false }
  )
