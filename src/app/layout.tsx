/* ---------- generateMetadata ---------- */
import type { JSX, ReactNode } from 'react'

import type { Metadata } from 'next'

export const generateMetadata: () => Metadata = (): Metadata => {
  return {
    manifest: '/manifest.webmanifest',
  }
}

/* ---------- layout ---------- */

interface RootLayoutProperties {
  readonly children: ReactNode
}

const RootLayout: (properties: RootLayoutProperties) => JSX.Element = ({
  children,
}: RootLayoutProperties): JSX.Element => {
  return children as JSX.Element
}

export default RootLayout
