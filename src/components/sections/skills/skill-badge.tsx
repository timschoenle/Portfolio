import { type JSX } from 'react'

import { type LucideIcon } from 'lucide-react'

import { getSkillIcon } from '@/components/sections/skills/skill-icons'
import type { FCStrict } from '@/types/fc'
import { type Skill } from '@/types/skill'

interface SkillBadgeProperties {
  readonly skill: Skill
}

export const SkillBadge: FCStrict<SkillBadgeProperties> = ({
  skill,
}: SkillBadgeProperties): JSX.Element => {
  const Icon: LucideIcon = getSkillIcon(skill.name)
  return (
    <li className="hover:shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 80%)] flex items-center gap-2 border border-brand/30 bg-brand/5 px-3 py-1.5 font-mono text-xs tracking-wider text-blueprint-muted uppercase transition-all hover:bg-brand/20 hover:text-blueprint-text">
      <Icon className="h-3 w-3" />
      <span>{skill.name}</span>
    </li>
  )
}
