import { type JSX } from 'react'

import { quadrantToPathId } from '@/components/sections/tech-radar/radar-defs'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'
import type { RadarConfigType, TechRadarQuadrant } from '@/types/tech-radar'

import { QUADRANT_STYLES } from './config'

interface RadarLabelProperties {
  readonly color: string
  readonly fontSize: number
  readonly label: string
  readonly quadrant: TechRadarQuadrant
}

const RadarLabel: FCStrict<RadarLabelProperties> = ({
  color,
  fontSize,
  label,
  quadrant,
}: RadarLabelProperties): JSX.Element => {
  return (
    <text
      className={`font-bold tracking-wider uppercase ${color}`}
      style={{ fontSize: `${String(fontSize)}px` }}
    >
      <textPath
        href={`#${quadrantToPathId(quadrant)}`}
        startOffset="50%"
        textAnchor="middle"
      >
        {label}
      </textPath>
    </text>
  )
}

interface RadarLabelsProperties {
  readonly labels: RadarConfigType['labels']
  readonly translations: Translations<'skills'>
}

export const RadarLabels: FCStrict<RadarLabelsProperties> = ({
  labels,
  translations,
}: RadarLabelsProperties): JSX.Element => {
  return (
    <>
      {/* Curved Quadrant Labels - Top quadrants */}
      <RadarLabel
        color={QUADRANT_STYLES.languages.labelColor}
        fontSize={labels.fontSize}
        label={translations('languages')}
        quadrant="languages"
      />
      <RadarLabel
        color={QUADRANT_STYLES.frameworks.labelColor}
        fontSize={labels.fontSize}
        label={translations('frameworks')}
        quadrant="frameworks"
      />

      {/* Curved Quadrant Labels - Bottom quadrants */}
      <RadarLabel
        color={QUADRANT_STYLES.buildTools.labelColor}
        fontSize={labels.fontSize}
        label={translations('buildTools')}
        quadrant="buildTools"
      />
      <RadarLabel
        color={QUADRANT_STYLES.infrastructure.labelColor}
        fontSize={labels.fontSize}
        label={translations('infrastructure')}
        quadrant="infrastructure"
      />
    </>
  )
}
