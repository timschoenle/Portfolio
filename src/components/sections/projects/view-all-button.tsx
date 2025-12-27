import { type JSX } from 'react'

import { siteConfig } from '@/data/config'
import type { FCStrict } from '@/types/fc'

interface ViewAllButtonProperties {
  readonly label: string
}

const VIEW_ALL_ARROW: string = '->'

export const ViewAllButton: FCStrict<ViewAllButtonProperties> = ({
  label,
}: ViewAllButtonProperties): JSX.Element => (
  <div className="mt-12 flex justify-center">
    <a
      className="group relative inline-flex items-center justify-center"
      href={siteConfig.socials.github}
      rel="noreferrer"
      target="_blank"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-sm bg-brand/20 blur-md transition-all duration-300 group-hover:bg-brand/40" />

      {/* Button Content */}
      <div className="group-hover:shadow-[0_0_15px_color-mix(in srgb, var(--brand), transparent 70%)] relative flex items-center gap-2 border border-brand bg-blueprint-bg/90 px-8 py-3 font-mono text-sm tracking-wider text-brand backdrop-blur-sm transition-all duration-300 group-hover:text-blueprint-text hover:bg-brand/10">
        <span>{label}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {VIEW_ALL_ARROW}
        </span>
      </div>

      {/* Corner Accents */}
      <div className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t border-l border-brand" />
      <div className="absolute -right-[1px] -bottom-[1px] h-2 w-2 border-r border-b border-brand" />
    </a>
  </div>
)
