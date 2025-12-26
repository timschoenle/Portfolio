import { type JSX } from 'react'

import { type Locale } from 'next-intl'

import { FileText, Home, Scale } from 'lucide-react'

import {
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command'
import type { Translations } from '@/types/i18n'

import { createPushHandler, type LocalizedRouter } from '../utils/actions'

interface NavGroupProperties {
  readonly locale: Locale
  readonly router: LocalizedRouter
  readonly run: (function_: () => void) => void
  readonly tAll: Translations<''>
  readonly tPalette: Translations<'commandPalette'>
}

export const NavGroup: React.FC<NavGroupProperties> = ({
  locale,
  router,
  run,
  tAll,
  tPalette,
}: NavGroupProperties): JSX.Element => (
  <CommandGroup heading={tPalette('navigation.heading')}>
    <CommandItem
      keywords={['home', 'start', 'index']}
      value="home"
      onSelect={createPushHandler({ href: '/', locale, router, run })}
    >
      <Home className="mr-2 h-4 w-4" />
      <span>{tPalette('navigation.home')}</span>
      <CommandShortcut>H</CommandShortcut>
    </CommandItem>
    <CommandItem
      keywords={['imprint', 'legal', 'address']}
      value="imprint"
      onSelect={createPushHandler({ href: '/imprint', locale, router, run })}
    >
      <FileText className="mr-2 h-4 w-4" />
      <span>{tAll('imprint.title')}</span>
      <CommandShortcut>I</CommandShortcut>
    </CommandItem>
    <CommandItem
      keywords={['privacy', 'data', 'protection']}
      value="privacy"
      onSelect={createPushHandler({ href: '/privacy', locale, router, run })}
    >
      <Scale className="mr-2 h-4 w-4" />
      <span>{tAll('privacy.title')}</span>
      <CommandShortcut>D</CommandShortcut>
    </CommandItem>
  </CommandGroup>
)
