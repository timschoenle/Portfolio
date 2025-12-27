import { type JSX } from 'react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { SkillList } from '@/components/sections/skills/skill-list'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'
import type { Skill } from '@/types/skill'

interface SkillsMatrixProperties {
  readonly buildTools: readonly Skill[]
  readonly frameworks: readonly Skill[]
  readonly infrastructure: readonly Skill[]
  readonly languages: readonly Skill[]
  readonly translations: Translations<'skills'>
}

export const SkillsMatrix: FCStrict<SkillsMatrixProperties> = ({
  buildTools,
  frameworks,
  infrastructure,
  languages,
  translations,
}: SkillsMatrixProperties): JSX.Element => (
  <BlueprintCard className="h-full" label="SKILL_MATRIX">
    <div className="space-y-8">
      <SkillList items={languages} title={translations('languages')} />
      <SkillList items={frameworks} title={translations('frameworks')} />
      <SkillList items={buildTools} title={translations('buildTools')} />
      <SkillList
        items={infrastructure}
        title={translations('infrastructure')}
      />
    </div>
  </BlueprintCard>
)
