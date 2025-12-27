import { type JSX, Suspense } from 'react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { LazyLoad } from '@/components/common/lazy-load'
import { TechRadar } from '@/components/sections/tech-radar/tech-radar'
import type { FCStrict } from '@/types/fc'
import type { Skill } from '@/types/skill'

interface SkillsRadarProperties {
  readonly buildTools: readonly Skill[]
  readonly frameworks: readonly Skill[]
  readonly infrastructure: readonly Skill[]
  readonly languages: readonly Skill[]
  readonly locale: string
}

export const SkillsRadar: FCStrict<SkillsRadarProperties> = ({
  buildTools,
  frameworks,
  infrastructure,
  languages,
  locale,
}: SkillsRadarProperties): JSX.Element => (
  <BlueprintCard
    className="relative hidden h-full items-center justify-center lg:flex"
    label="RADAR_SCAN"
    noPadding={true}
  >
    {/* Tech Radar (Hidden on small mobile if needed, but keeping logic similar) */}
    <div className="h-full w-full">
      <LazyLoad className="h-full w-full">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-32 w-32 animate-pulse rounded-full bg-brand/10" />
            </div>
          }
        >
          <TechRadar
            buildTools={buildTools}
            frameworks={frameworks}
            infrastructure={infrastructure}
            languages={languages}
            locale={locale}
          />
        </Suspense>
      </LazyLoad>
    </div>
  </BlueprintCard>
)
