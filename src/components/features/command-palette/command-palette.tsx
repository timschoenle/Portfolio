'use client'

import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'

import { type Locale, useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

import { ActionsGroup } from './groups/actions-group'
import { NavGroup } from './groups/nav-group'
import { SectionsGroup } from './groups/sections-group'
import { useCommandShortcuts } from './hooks/use-command-shortcuts'
import { usePaletteNavigation } from './hooks/use-palette-navigation'
import { type LocalizedRouter } from './utils/actions'

/* ───────────────────────────── main component ─────────────────────────── */

export const CommandPalette: FCStrict = (): JSX.Element => {
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)

  const locale: Locale = useLocale()
  const router: LocalizedRouter = useRouter()
  const pathname: string = usePathname()

  const tPalette: Translations<'commandPalette'> =
    useTranslations('commandPalette')
  const tAll: Translations<''> = useTranslations()

  const run: (function_: () => void) => void = useCallback(
    (function_: () => void): void => {
      setOpen(false)
      function_()
    },
    []
  )

  useCommandShortcuts({ setOpen })
  usePaletteNavigation({ locale, open, pathname, router, run })

  return (
    <CommandDialog
      description={tPalette('dialog.description')}
      open={open}
      title={tPalette('dialog.title')}
      onOpenChange={setOpen}
    >
      <CommandList>

        <NavGroup
          locale={locale}
          router={router}
          run={run}
          tAll={tAll}
          tPalette={tPalette}
        />

        <CommandSeparator />

        <SectionsGroup
          locale={locale}
          pathname={pathname}
          router={router}
          run={run}
          tAll={tAll}
          tPalette={tPalette}
        />

        <CommandSeparator />

        <ActionsGroup run={run} tPalette={tPalette} />
      </CommandList>
    </CommandDialog>
  )
}
