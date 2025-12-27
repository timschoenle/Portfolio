import { type JSX } from 'react'

import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

import { BlueprintContainer } from './blueprint-container'
import { BlueprintSectionDivider } from './blueprint-section-divider'
import { BlueprintSectionTitle } from './blueprint-section-title'

interface BlueprintSectionProperties extends WithRequiredChildren {
  readonly className?: string
  readonly dividerLabel?: string
  readonly id: string
  readonly isLazy?: boolean
  readonly sectionLabel: string
  readonly subtitle?: string
  readonly title: string
}

export const BlueprintSection: FCWithRequiredChildren<
  BlueprintSectionProperties
> = ({
  children,
  className,
  dividerLabel,
  id: sectionId,
  isLazy,
  sectionLabel,
  subtitle,
  title,
}: BlueprintSectionProperties): JSX.Element => (
  <BlueprintContainer id={sectionId} isLazy={isLazy ?? false}>
    <div
      className={`mx-auto flex w-full max-w-6xl flex-col items-center ${className ?? ''}`}
    >
      <BlueprintSectionTitle
        sectionLabel={sectionLabel}
        title={title}
        {...(Boolean(subtitle) ? { subtitle } : {})}
      />

      {children}

      {Boolean(dividerLabel) && (
        <BlueprintSectionDivider label={dividerLabel ?? ''} />
      )}
    </div>
  </BlueprintContainer>
)
