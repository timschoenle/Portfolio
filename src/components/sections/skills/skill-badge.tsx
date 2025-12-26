import { type JSX } from 'react'

import { BlueprintBadge } from '@/components/blueprint/blueprint-badge'
import type { FCStrict } from '@/types/fc'
import { type Skill } from '@/types/skill'

interface SkillBadgeProperties {
  readonly skill: Skill
}

export const SkillBadge: FCStrict<SkillBadgeProperties> = ({
  skill,
}: SkillBadgeProperties): JSX.Element => (
  <BlueprintBadge iconName={skill.name} label={skill.name} variant="standard" />
)
