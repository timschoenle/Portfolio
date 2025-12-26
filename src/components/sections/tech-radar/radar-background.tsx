import { type JSX } from 'react'

import styles from '@/components/sections/tech-radar/tech-radar.module.css'
import type { FCStrict } from '@/types/fc'
import type { RadarConfigType } from '@/types/tech-radar'

interface RadarBackgroundProperties {
  readonly animation: RadarConfigType['animation']
  readonly circles: RadarConfigType['circles']
  readonly viewBox: RadarConfigType['viewBox']
}

export const RadarBackground: FCStrict<RadarBackgroundProperties> = ({
  animation,
  circles,
  viewBox,
}: RadarBackgroundProperties): JSX.Element => {
  const sweepRadius: number = animation.sonarSweepRadius
  const sweepAngle: number = (animation.sonarSweepAngle * Math.PI) / 180
  const sweepEndX: number = Math.cos(sweepAngle) * sweepRadius
  const sweepEndY: number = Math.sin(sweepAngle) * sweepRadius

  return (
    <>
      {/* Background circles */}
      <circle
        className="fill-muted/20 stroke-border stroke-1"
        cx="0"
        cy="0"
        r={circles.inner}
      />
      <circle
        className="fill-muted/10 stroke-border stroke-1"
        cx="0"
        cy="0"
        r={circles.middle}
      />
      <circle
        className="fill-transparent stroke-border stroke-1"
        cx="0"
        cy="0"
        r={circles.outer}
      />

      {/* Sonar sweep animation */}
      <g className={styles['radarSpin']}>
        <path
          className="fill-primary/20"
          d={`M 0 0 L ${String(sweepRadius)} 0 A ${String(sweepRadius)} ${String(sweepRadius)} 0 0 1 ${String(sweepEndX)} ${String(sweepEndY)} Z`}
        />
      </g>

      {/* Axes - clipped to circle */}
      <g clipPath="url(#radarClip)">
        <line
          className="stroke-border/50 stroke-1"
          x1={String(viewBox.min)}
          x2={String(viewBox.max)}
          y1="0"
          y2="0"
        />
        <line
          className="stroke-border/50 stroke-1"
          x1="0"
          x2="0"
          y1={String(viewBox.min)}
          y2={String(viewBox.max)}
        />
      </g>
    </>
  )
}
