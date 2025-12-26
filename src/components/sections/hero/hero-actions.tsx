/* eslint-disable sonarjs/deprecation, @typescript-eslint/no-deprecated */
import { type JSX } from 'react'

import { Github, Mail } from 'lucide-react'

import { BlueprintButton } from '@/components/blueprint/blueprint-button'
import { siteConfig } from '@/data/config'
import type { FCStrict } from '@/types/fc'

interface HeroActionsProperties {
  readonly contactText: string
  readonly githubLabel: string
}

export const HeroActions: FCStrict<HeroActionsProperties> = ({
  contactText,
  githubLabel,
}: HeroActionsProperties): JSX.Element => (
  <div className="mt-16 flex flex-wrap gap-8">
    <BlueprintButton
      href={siteConfig.socials.github}
      icon={Github}
      target="_blank"
      variant="outline"
    >
      {githubLabel}
    </BlueprintButton>

    <BlueprintButton
      href={`mailto:${siteConfig.email}`}
      icon={Mail}
      variant="primary"
    >
      {contactText}
    </BlueprintButton>
  </div>
)
