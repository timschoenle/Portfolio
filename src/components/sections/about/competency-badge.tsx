import { type JSX } from 'react'

import { BlueprintBadge } from '@/components/blueprint/blueprint-badge'
import type { FCStrict } from '@/types/fc'

interface CompetencyBadgeProperties {
  readonly label: string
}

export const CompetencyBadge: FCStrict<CompetencyBadgeProperties> = ({
  label,
}: CompetencyBadgeProperties): JSX.Element => (
  <BlueprintBadge label={label} variant="bracket" />
)
