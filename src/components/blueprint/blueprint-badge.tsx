import { type JSX } from 'react'

import { getSkillIcon } from '@/components/sections/skills/skill-icons'
import type { FCStrict } from '@/types/fc'

import type { LucideIcon } from 'lucide-react'

interface BlueprintBadgeProperties {
  readonly iconName?: string
  readonly label: string
  readonly variant?: 'bracket' | 'standard'
}

const OPEN_BRACKET: string = '['
const CLOSE_BRACKET: string = ']'

export const BlueprintBadge: FCStrict<BlueprintBadgeProperties> = ({
  iconName,
  label,
  variant = 'standard',
}: BlueprintBadgeProperties): JSX.Element => {
  if (variant === 'bracket') {
    return (
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
  }

  const Icon: LucideIcon | undefined =
    iconName === undefined ? undefined : getSkillIcon(iconName)

  return (
    <li className="hover:shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 80%)] flex items-center gap-2 border border-brand/30 bg-brand/5 px-3 py-1.5 font-mono text-xs tracking-wider text-blueprint-muted uppercase transition-all hover:bg-brand/20 hover:text-blueprint-text">
      {Boolean(Icon) && Icon ? <Icon className="h-3 w-3" /> : null}
      <span>{label}</span>
    </li>
  )
}
