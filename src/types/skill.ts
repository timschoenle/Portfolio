export const SKILL_RENDER_AREAS: {
  readonly RESUME: 'resume'
  readonly SECTION: 'section'
  readonly TECH_RADAR: 'tech-radar'
} = {
  RESUME: 'resume',
  SECTION: 'section',
  TECH_RADAR: 'tech-radar',
} as const

export type SkillRenderArea =
  (typeof SKILL_RENDER_AREAS)[keyof typeof SKILL_RENDER_AREAS]

export interface Skill {
  readonly confidence: number
  readonly name: string
  readonly renderAreas?: SkillRenderArea[]
}
