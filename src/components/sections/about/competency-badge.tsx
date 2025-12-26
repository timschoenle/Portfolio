import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface CompetencyBadgeProperties {
  readonly label: string
}

const OPEN_BRACKET: string = '['
const CLOSE_BRACKET: string = ']'

export const CompetencyBadge: FCStrict<CompetencyBadgeProperties> = ({
  label,
}: CompetencyBadgeProperties): JSX.Element => (
  <div className="group relative overflow-hidden px-4 py-2 font-mono text-xs tracking-widest text-brand uppercase transition-all hover:text-blueprint-text">
    <span className="relative z-10 flex items-center gap-2">
      <span className="text-brand/50">{OPEN_BRACKET}</span>
      {label}
      <span className="text-brand/50">{CLOSE_BRACKET}</span>
    </span>
    {/* Hover highlight */}
    <div className="absolute inset-0 bg-brand/10 opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 h-px w-full bg-brand/30" />
  </div>
)
