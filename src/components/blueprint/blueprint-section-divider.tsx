import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

import { BlueprintLabel } from './blueprint-label'

interface BlueprintSectionDividerProperties {
  readonly label: string
}

const MARKER: string = '//'

export const BlueprintSectionDivider: FCStrict<
  BlueprintSectionDividerProperties
> = ({ label }: BlueprintSectionDividerProperties): JSX.Element => (
  <BlueprintLabel className="mx-auto mt-16 w-full max-w-xs border-t border-brand/20 pt-8 text-center font-mono text-[10px] tracking-[0.3em] text-brand/40 uppercase">
    {MARKER} {label}
  </BlueprintLabel>
)
