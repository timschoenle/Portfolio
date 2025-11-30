import { type JSX } from 'react'

import { type createFormatter, type Locale } from 'next-intl'

import { Calendar } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'

import type { FCAsync } from '@/types/fc'
import type { Translations } from '@/types/i18n'

interface LastUpdateNoticeProperties {
  readonly lastUpdate: Date
  readonly locale: Locale
}

const LastUpdateNotice: FCAsync<LastUpdateNoticeProperties> = async ({
  lastUpdate,
  locale,
}: LastUpdateNoticeProperties): Promise<JSX.Element> => {
  const translations: Translations<'common'> = await getTranslations({
    locale,
    namespace: 'common',
  })

  const format: ReturnType<typeof createFormatter> = await getFormatter({
    locale: locale,
  })

  const formattedDate: string = format.dateTime(lastUpdate, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mt-8 flex items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
      <Calendar className="h-4 w-4" />
      <span>{translations.rich('lastUpdated', { date: formattedDate })} </span>
    </div>
  )
}

export default LastUpdateNotice
