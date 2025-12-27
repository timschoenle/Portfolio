import {
  calculateBlipPosition,
  resolveBlipCollisions,
} from '@/lib/tech-radar-utilities'
import { type Skill } from '@/types/skill'
import type {
  Blip,
  CalculateBlipPositionResult,
  QuadrantAngleType,
  TechRadarQuadrant,
} from '@/types/tech-radar'

interface GenerateBlipsForCategoryParameters {
  readonly config: QuadrantAngleType
  readonly items: readonly Skill[]
  readonly quadrantKey: TechRadarQuadrant
}

export const generateBlipsForCategory: (
  parameter: GenerateBlipsForCategoryParameters
) => Blip[] = ({
  config,
  items,
  quadrantKey,
}: GenerateBlipsForCategoryParameters): Blip[] => {
  // 1. Calculate initial positions
  const initialBlips: Blip[] = items.map(
    (skill: Skill, index: number): Blip => {
      const position: CalculateBlipPositionResult = calculateBlipPosition({
        confidence: skill.confidence,
        endAngle: config.end,
        index,
        skillName: skill.name,
        startAngle: config.start,
        total: items.length,
      })
      return {
        ...position,
        iconName: skill.name,
        id: `${quadrantKey}-${skill.name}`,
        name: skill.name,
        quadrant: quadrantKey,
      }
    }
  )

  // 2. Resolve collisions
  const resolvedPositions: CalculateBlipPositionResult[] =
    resolveBlipCollisions({
      blips: initialBlips,
      endAngle: config.end,
      startAngle: config.start,
    })

  // 3. Merge resolved positions back into blips
  return initialBlips.map((blip: Blip, index: number): Blip => {
    const resolved: CalculateBlipPositionResult | undefined =
      resolvedPositions.at(index)

    if (!resolved) {
      // This should never happen since resolvedPositions has same length as initialBlips
      // but we need to handle it for type safety
      return blip
    }

    return {
      ...blip,
      angle: resolved.angle,
      radius: resolved.radius,
      xCoordinate: resolved.xCoordinate,
      yCoordinate: resolved.yCoordinate,
    }
  })
}
