import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config: { matcher: string[] } = {
  matcher: [String.raw`/((?!_next/|static/|apple-icon|icon|api/|.*\..*).*)`],
}
