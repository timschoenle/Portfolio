import { type JSX, type ReactNode } from 'react'

import type { FCWithRequiredChildren } from '@/types/fc'

import { BlueprintGrid } from './blueprint-grid'

interface BlueprintContainerProperties {
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
  readonly overlay?: ReactNode
}

export const BlueprintContainer: FCWithRequiredChildren<
  BlueprintContainerProperties
> = ({
  children,
  className,
  id,
  overlay,
}: BlueprintContainerProperties): JSX.Element => (
  <section
    className={`relative flex min-h-screen w-full snap-start flex-col items-center justify-center overflow-hidden bg-[#0B1021] py-24 text-[#E6F1FF] ${className ?? ''}`}
    id={id}
  >
    <BlueprintGrid />

    {/* Outer Frame with dimensions / ticks */}
    <div className="pointer-events-none absolute inset-[var(--app-padding)] border-[0.5px] border-[#4A90E2]/30 select-none">
      {/* Corner Ticks */}
      <div className="absolute top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 border-r border-[#4A90E2]" />
      <div className="absolute top-0 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 border-l border-[#4A90E2]" />
      <div className="absolute bottom-0 left-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 border-r border-[#4A90E2]" />
      <div className="absolute right-0 bottom-0 h-2 w-2 translate-x-1/2 translate-y-1/2 border-l border-[#4A90E2]" />

      {/* Scale/Ruler markings on edges */}
      <div className="absolute top-0 left-10 flex gap-1">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            className={`h-${index % 5 === 0 ? '2' : '1'} w-px bg-[#4A90E2]/40`}
            key={index}
          />
        ))}
      </div>
      <div className="absolute right-10 bottom-0 flex gap-1">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            className={`h-${index % 5 === 0 ? '2' : '1'} w-px bg-[#4A90E2]/40`}
            key={index}
          />
        ))}
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 container px-[var(--app-padding)]">
      {children}
    </div>

    {/* Overlay Elements (positioned relative to section) */}
    {overlay}
  </section>
)
