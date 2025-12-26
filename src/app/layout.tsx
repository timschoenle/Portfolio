/* ---------- generateMetadata ---------- */
import type { JSX } from 'react'

import type { Metadata } from 'next'

import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

export const generateMetadata: () => Metadata = (): Metadata => {
  return {
    manifest: '/manifest.webmanifest',
  }
}

/* ---------- layout ---------- */

type RootLayoutProperties = WithRequiredChildren

const RootLayout: FCWithRequiredChildren<RootLayoutProperties> = ({
  children,
}: RootLayoutProperties): JSX.Element => {
  return children as JSX.Element
}

export default RootLayout
