'use server'

import { type JSX } from 'react'

import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

type BackToHomeProperties = LocalePageProperties

export const BackToHome: AsyncPageFC<BackToHomeProperties> = async ({
  locale,
}: BackToHomeProperties): Promise<JSX.Element> => {
  const translations: Translations<'common'> = await getTranslations({
    locale,
    namespace: 'common',
  })

  return (
    <Link href="/">
      <Button className="mb-8" variant="ghost">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {translations('backToHome')}
      </Button>
    </Link>
  )
}
