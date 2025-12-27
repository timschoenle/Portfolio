import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'
import type { RadarConfigType, TechRadarQuadrant } from '@/types/tech-radar'

import { LABEL_PATHS } from './config'

export const quadrantToPathId: (quadrant: TechRadarQuadrant) => string = (
  quadrant: TechRadarQuadrant
): string => {
  return `${quadrant}Path`
}

interface RadarDefsProperties {
  readonly circles: RadarConfigType['circles']
}

export const RadarDefs: FCStrict<RadarDefsProperties> = ({
  circles,
}: RadarDefsProperties): JSX.Element => {
  return (
    <defs>
      <clipPath id="radarClip">
        <circle cx="0" cy="0" r={circles.outer} />
      </clipPath>

      {/* Curved text paths for quadrant labels */}
      <path
        d={LABEL_PATHS.languages}
        fill="none"
        id={quadrantToPathId('languages')}
      />
      <path
        d={LABEL_PATHS.frameworks}
        fill="none"
        id={quadrantToPathId('frameworks')}
      />
      <path
        d={LABEL_PATHS.buildTools}
        fill="none"
        id={quadrantToPathId('buildTools')}
      />
      <path
        d={LABEL_PATHS.infrastructure}
        fill="none"
        id={quadrantToPathId('infrastructure')}
      />
    </defs>
  )
}
