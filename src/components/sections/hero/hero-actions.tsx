import { type JSX } from 'react'

/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable sonarjs/deprecation */
import { Github, Mail } from 'lucide-react'

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
    {/* Custom Technical Button */}
    <a
      className="group relative px-8 py-3 font-mono text-sm tracking-widest text-brand uppercase transition-colors hover:text-blueprint-text"
      href={siteConfig.socials.github}
      rel="noreferrer"
      target="_blank"
    >
      <span className="relative z-10 flex items-center gap-2">
        <Github className="h-4 w-4" />
        {githubLabel}
      </span>
      {/* Button Frame */}
      <div className="group-hover:shadow-[0_0_15px_color-mix(in srgb, var(--brand), transparent 70%)] absolute inset-0 skew-x-[-12deg] border border-brand bg-brand/5 transition-all group-hover:bg-brand/20" />
      <div className="absolute right-0 bottom-0 h-1 w-1 bg-brand" />
      <div className="absolute top-0 left-0 h-1 w-1 bg-brand" />
    </a>

    <a
      className="group relative px-8 py-3 font-mono text-sm tracking-widest text-blueprint-bg uppercase transition-colors hover:text-blueprint-text"
      href={`mailto:${siteConfig.email}`}
    >
      <span className="relative z-10 flex items-center gap-2 font-bold">
        <Mail className="h-4 w-4" />
        {contactText}
      </span>
      {/* Button Frame Filled */}
      <div className="shadow-[0_0_15px_color-mix(in srgb, var(--brand), transparent 60%)] absolute inset-0 skew-x-[-12deg] border border-brand bg-brand transition-all group-hover:bg-transparent group-hover:text-brand" />
    </a>
  </div>
)
