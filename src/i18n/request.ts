import { type Locale } from 'next-intl'
import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    // This typically corresponds to the `[locale]` segment
    let locale: string | undefined = await requestLocale

    // Ensure that a valid locale is used
    if (locale === null || !routing.locales.includes(locale as never)) {
      locale = routing.defaultLocale
    }

    return {
      locale: locale as Locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    }
  }
)
