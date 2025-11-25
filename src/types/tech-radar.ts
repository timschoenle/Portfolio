import type { Skill, SkillRenderArea } from '@/lib/config'

export type TechRadarQuadrant =
  | 'buildTools'
  | 'frameworks'
  | 'infrastructure'
  | 'languages'

export interface Blip {
  readonly angle: number
  readonly iconName: string
  readonly id: string
  readonly name: string
  readonly quadrant: TechRadarQuadrant
  readonly radius: number
  readonly xCoordinate: number
  readonly yCoordinate: number
}

export interface CalculateBlipPositionParameters {
  readonly confidence: number
  readonly endAngle: number
  readonly index: number
  readonly skillName: string
  readonly startAngle: number
  readonly total: number
}

export interface CalculateBlipPositionResult {
  readonly angle: number
  readonly radius: number
  readonly xCoordinate: number
  readonly yCoordinate: number
}

/**
 * Radar dimensions and layout configuration
 */
export interface RadarConfigType {
  readonly animation: {
    readonly sonarSweepAngle: number
    readonly sonarSweepRadius: number
  }
  readonly blips: {
    readonly hoverScale: number
    readonly maxRadius: number
    readonly minRadius: number
    readonly size: number
    readonly strokeWidth: number
  }
  readonly circles: {
    readonly inner: number
    readonly middle: number
    readonly outer: number
  }
  readonly jitter: {
    readonly angle: number
    readonly radius: number
  }
  readonly labels: {
    readonly bottomRadius: number
    readonly fontSize: number
    readonly topRadius: number
  }
  readonly viewBox: {
    readonly height: number
    readonly max: number
    readonly min: number
    readonly width: number
  }
}

/**
 * Quadrant angle configuration
 */
export interface QuadrantAngleType {
  readonly end: number
  readonly start: number
}

/**
 * Quadrant angles for all four quadrants
 */
export interface QuadrantAnglesType {
  readonly buildTools: QuadrantAngleType
  readonly frameworks: QuadrantAngleType
  readonly infrastructure: QuadrantAngleType
  readonly languages: QuadrantAngleType
}

/**
 * Quadrant styling configuration
 */
export interface QuadrantStyleType {
  readonly blipColor: string
  readonly labelColor: string
}

/**
 * Quadrant styles for all four quadrants
 */
export interface QuadrantStylesType {
  readonly buildTools: QuadrantStyleType
  readonly frameworks: QuadrantStyleType
  readonly infrastructure: QuadrantStyleType
  readonly languages: QuadrantStyleType
}

/**
 * Label paths for curved text
 */
export interface LabelPathsType {
  readonly buildTools: string
  readonly frameworks: string
  readonly infrastructure: string
  readonly languages: string
}

export interface ShouldShowSkillParameter {
  readonly renderArea: SkillRenderArea
  readonly skill: Skill
}
