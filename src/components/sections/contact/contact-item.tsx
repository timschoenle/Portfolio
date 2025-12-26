import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface ContactItemProperties {
  readonly href: string
  readonly icon: JSX.Element
  readonly label: string
  readonly subLabel?: string
}

export const ContactItem: FCStrict<ContactItemProperties> = ({
  href,
  icon,
  label,
  subLabel,
}: ContactItemProperties): JSX.Element => (
  <a
    className="group hover:shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 90%)] relative flex items-center gap-4 border border-brand/30 bg-brand/5 p-4 transition-all hover:bg-brand/10"
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-none border border-brand bg-blueprint-bg text-brand shadow-[0_0_5px_#60A5FA]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="font-mono text-sm font-bold tracking-wide text-blueprint-text transition-colors group-hover:text-brand">
        {label}
      </span>
      {Boolean(subLabel) && (
        <span className="font-mono text-xs tracking-wider text-blueprint-muted uppercase">
          {subLabel}
        </span>
      )}
    </div>

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-brand" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-brand" />
  </a>
)
