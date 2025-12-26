/**
 * Types-only utilities for React components in a strict TS/ESLint setup.
 *
 * Linting approach:
 * - This file only exports types. Some linters running without full type info
 *   can flag exported type parameters/aliases as "unused". We disable that here,
 *   *only* for this file, to avoid false positives without weakening app code.
 */

import type { JSX, ReactNode } from 'react'

/** ------------------------------------------------------------------------
 *  Helpers
 *  --------------------------------------------------------------------- */

export type NoProperties = Readonly<Record<never, never>>

export interface NoChildren {
  readonly children?: never
}
export interface WithChildren {
  readonly children?: Readonly<ReactNode>
}
export interface WithRequiredChildren {
  readonly children: ReactNode
}

/** ------------------------------------------------------------------------
 *  Core FC shapes (no React.FC)
 *  - Forbid `null` by returning JSX.Element (not ReactElement | null).
 *  - Parameters are Readonly<…> to satisfy prefer-readonly-parameter-types.
 *  --------------------------------------------------------------------- */

export type FCStrict<P = NoProperties> = (
  properties: Readonly<NoChildren & P>
) => JSX.Element

export type FCNullable<P = NoProperties> = (
  properties: Readonly<NoChildren & P>
) => JSX.Element | null

export type FCWithChildren<P = NoProperties> = (
  properties: Readonly<P & WithChildren>
) => JSX.Element

export type FCWithRequiredChildren<P = NoProperties> = (
  properties: Readonly<P & WithRequiredChildren>
) => JSX.Element

/** Async server components (e.g., Next.js Server Components) */
export type FCAsync<P = NoProperties> = (
  properties: Readonly<NoChildren & P>
) => Promise<JSX.Element>

export type FCAsyncWithChildren<P = NoProperties> = (
  properties: Readonly<P & WithChildren>
) => Promise<JSX.Element>

/** ------------------------------------------------------------------------
 *  Next.js convenience aliases
 *  --------------------------------------------------------------------- */
export type PageFC<P = NoProperties> = FCStrict<P>
export type AsyncPageFC<P = NoProperties> = FCAsync<P>
