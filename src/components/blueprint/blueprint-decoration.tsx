/* eslint-disable complexity, max-lines-per-function */
import { type JSX, memo, type MemoExoticComponent } from 'react'

import { cn } from '@/lib/utilities'
import type { FCStrict } from '@/types/fc'

/* ─── Interfaces ───────────────────────────────────────────────────────────── */

interface BlueprintCornersProperties {
  readonly className?: string
  readonly strokeWidth?: number
  readonly variant?: 'all' | 'bracket' | 'lines'
}

interface BlueprintSideDecorationProperties {
  readonly className?: string
  readonly orientation?: 'horizontal' | 'vertical'
}

/* ─── Components ───────────────────────────────────────────────────────────── */

/**
 * Standardized 4-corner decoration using SVG for better scaling/performance
 * compared to 4 separate divs.
 */
const BlueprintCornersComponent: FCStrict<BlueprintCornersProperties> = ({
  className,
  strokeWidth = 2,
  variant = 'all',
}: BlueprintCornersProperties): JSX.Element => (
  <svg
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-0 h-full w-full overflow-visible',
      className
    )}
  >
    {/* Top-left */}
    {(variant === 'all' || variant === 'bracket') && (
      <path
        className="fill-none stroke-brand"
        d="M0 8 V0 H8"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    )}
    {variant === 'lines' && (
      <line
        className="stroke-brand"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        x1="6"
        x2="6"
        y1="-4"
        y2="4"
      />
    )}

    {/* Top-right */}
    <svg overflow="visible" x="100%" y="0">
      {variant === 'all' && (
        <path
          className="fill-none stroke-brand"
          d="M-8 0 H0 V8"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {variant === 'lines' && (
        <line
          className="stroke-brand"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          x1="-6"
          x2="-6"
          y1="-4"
          y2="4"
        />
      )}
    </svg>

    {/* Bottom-left */}
    <svg overflow="visible" x="0" y="100%">
      {variant === 'all' && (
        <path
          className="fill-none stroke-brand"
          d="M0 -8 V0 H8"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {variant === 'lines' && (
        <line
          className="stroke-brand"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          x1="6"
          x2="6"
          y1="-4"
          y2="4"
        />
      )}
    </svg>

    {/* Bottom-right */}
    <svg overflow="visible" x="100%" y="100%">
      {(variant === 'all' || variant === 'bracket') && (
        <path
          className="fill-none stroke-brand"
          d="M-8 0 H0 V-8"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {variant === 'lines' && (
        <line
          className="stroke-brand"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          x1="-6"
          x2="-6"
          y1="-4"
          y2="4"
        />
      )}
    </svg>
  </svg>
)

export const BlueprintCorners: MemoExoticComponent<
  FCStrict<BlueprintCornersProperties>
> = memo(BlueprintCornersComponent)

/**
 * Vertical or horizontal decorative bars used in Blueprint designs
 */
export const BlueprintSideDecoration: FCStrict<
  BlueprintSideDecorationProperties
> = ({
  className,
  orientation = 'vertical',
}: BlueprintSideDecorationProperties): JSX.Element => {
  const isVertical: boolean = orientation === 'vertical'
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'absolute overflow-visible',
        isVertical ? 'h-16 w-1' : 'h-1 w-16',
        className
      )}
    >
      <rect className="fill-current text-brand/40" height="100%" width="100%" />
    </svg>
  )
}
