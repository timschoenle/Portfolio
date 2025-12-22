/* ---------- generateMetadata ---------- */
import type { JSX, ReactNode } from 'react'

import type { Metadata } from 'next'

import { SerwistProvider } from '@/$lib/client'
import { DevelopmentServiceWorkerGuard } from '@/components/features/development-service-worker-cleanup'
import { environment } from '@/environment'

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
  return (
    <body>
      {environment.NODE_ENV === 'development' ? (
        <>
          <DevelopmentServiceWorkerGuard />
          {children}
        </>
      ) : (
        <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
      )}
    </body>
  )
}

export default RootLayout
