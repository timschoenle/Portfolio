'use client'

import {
  Briefcase,
  Code,
  CookieIcon,
  FileText,
  GitBranch,
  Home,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react'
import { type Locale, useLocale, useTranslations } from 'next-intl'
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { usePathname, useRouter } from '@/i18n/routing'
import { siteConfig } from '@/lib/config'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

/* ──────────────────────────── types & aliases ─────────────────────────── */

type LocalizedRouter = ReturnType<typeof useRouter>
type SectionId = 'about' | 'skills' | 'projects' | 'contact'

/* ────────────────────────────── helpers ──────────────────────────────── */

const scrollToSection: (id: string) => void = (id: string): void => {
  const el: HTMLElement | null = document.querySelector<HTMLElement>(
    `[id="${id}"]`
  )
  if (el !== null) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface GoToSectionParams {
  readonly router: LocalizedRouter
  readonly locale: Locale
  readonly pathname: string // canonical (no locale prefix)
  readonly id: SectionId
}
const goToSection: (p: GoToSectionParams) => void = (
  p: GoToSectionParams
): void => {
  const isHome: boolean = p.pathname === '/'
  if (isHome) {
    scrollToSection(p.id)
    return
  }
  // push canonical href; next-intl router injects locale
  p.router.push(`/#${p.id}`, { locale: p.locale })
}

const openNewTab: (url: string) => void = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
const sendMailTo: (email: string) => void = (email: string): void => {
  window.location.href = `mailto:${email}`
}

/* factories to satisfy unicorn/consistent-function-scoping */

interface CreatePushHandlerParams {
  readonly router: LocalizedRouter
  readonly locale: Locale
  readonly href: '/' | '/imprint' | '/privacy'
  readonly run: (fn: () => void) => void
}
const createPushHandler: (
  p: CreatePushHandlerParams
) => (_value: string) => void = (
  p: CreatePushHandlerParams
): ((_value: string) => void) => {
  return (_value: string): void => {
    p.run((): void => {
      p.router.push(p.href, { locale: p.locale })
    })
  }
}

interface CreateOnSelectSectionParams {
  readonly router: LocalizedRouter
  readonly locale: Locale
  readonly pathname: string
  readonly id: SectionId
  readonly run: (fn: () => void) => void
}
const createOnSelectSection: (
  p: CreateOnSelectSectionParams
) => (_value: string) => void = (p: CreateOnSelectSectionParams) => {
  return (_value: string): void => {
    p.run((): void => {
      goToSection({
        router: p.router,
        locale: p.locale,
        pathname: p.pathname,
        id: p.id,
      })
    })
  }
}

/* ───────────────────────────── sub-views ─────────────────────────────── */

interface NavGroupProps {
  readonly locale: Locale
  readonly tPalette: Translations<'commandPalette'>
  readonly tAll: Translations<''>
  readonly router: LocalizedRouter
  readonly run: (fn: () => void) => void
}
const NavGroup: FCStrict<NavGroupProps> = ({
  locale,
  tPalette,
  tAll,
  router,
  run,
}: NavGroupProps): JSX.Element => {
  const goHome: (_value: string) => void = createPushHandler({
    router,
    locale,
    href: '/',
    run,
  })
  const goImprint: (_value: string) => void = createPushHandler({
    router,
    locale,
    href: '/imprint',
    run,
  })
  const goPrivacy: (_value: string) => void = createPushHandler({
    router,
    locale,
    href: '/privacy',
    run,
  })

  return (
    <CommandGroup heading={tPalette('navigation')}>
      <CommandItem onSelect={goHome}>
        <Home className="mr-2 h-4 w-4" />
        <span>{tPalette('home')}</span>
      </CommandItem>
      <CommandItem onSelect={goImprint}>
        <FileText className="mr-2 h-4 w-4" />
        <span>{tAll('imprint.title')}</span>
      </CommandItem>
      <CommandItem onSelect={goPrivacy}>
        <CookieIcon className="mr-2 h-4 w-4" />
        <span>{tAll('privacy.title')}</span>
      </CommandItem>
    </CommandGroup>
  )
}

interface SectionsGroupProps {
  readonly tPalette: Translations<'commandPalette'>
  readonly tAll: Translations<''>
  readonly run: (fn: () => void) => void
  readonly router: LocalizedRouter
  readonly locale: Locale
  readonly pathname: string
}
const SectionsGroup: FCStrict<SectionsGroupProps> = ({
  tPalette,
  tAll,
  run,
  router,
  locale,
  pathname,
}: SectionsGroupProps): JSX.Element => {
  const toAbout: (_value: string) => void = createOnSelectSection({
    router,
    locale,
    pathname,
    id: 'about',
    run,
  })
  const toSkills: (_value: string) => void = createOnSelectSection({
    router,
    locale,
    pathname,
    id: 'skills',
    run,
  })
  const toProjects: (_value: string) => void = createOnSelectSection({
    router,
    locale,
    pathname,
    id: 'projects',
    run,
  })
  const toContact: (_value: string) => void = createOnSelectSection({
    router,
    locale,
    pathname,
    id: 'contact',
    run,
  })

  return (
    <CommandGroup heading={tPalette('sections')}>
      <CommandItem onSelect={toAbout}>
        <User className="mr-2 h-4 w-4" />
        <span>{tAll('about.title')}</span>
      </CommandItem>
      <CommandItem onSelect={toSkills}>
        <Code className="mr-2 h-4 w-4" />
        <span>{tAll('skills.title')}</span>
      </CommandItem>
      <CommandItem onSelect={toProjects}>
        <Briefcase className="mr-2 h-4 w-4" />
        <span>{tAll('projects.title')}</span>
      </CommandItem>
      <CommandItem onSelect={toContact}>
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>{tAll('contact.title')}</span>
      </CommandItem>
    </CommandGroup>
  )
}

interface ActionsGroupProps {
  readonly tPalette: Translations<'commandPalette'>
  readonly run: (fn: () => void) => void
}
const ActionsGroup: FCStrict<ActionsGroupProps> = ({
  tPalette,
  run,
}: ActionsGroupProps): JSX.Element => {
  const goGitHub: (_value: string) => void = (_value: string): void => {
    run((): void => {
      openNewTab(siteConfig.github)
    })
  }
  const emailMe: (_value: string) => void = (_value: string): void => {
    run((): void => {
      sendMailTo(siteConfig.email)
    })
  }

  return (
    <CommandGroup heading={tPalette('actions')}>
      <CommandItem onSelect={goGitHub}>
        <GitBranch className="mr-2 h-4 w-4" />
        <span>{tPalette('github')}</span>
      </CommandItem>
      <CommandItem onSelect={emailMe}>
        <Mail className="mr-2 h-4 w-4" />
        <span>{tPalette('email')}</span>
      </CommandItem>
    </CommandGroup>
  )
}

/* ───────────────────────────── main component ─────────────────────────── */

// eslint-disable-next-line max-lines-per-function
export const CommandPalette: FCStrict = (): JSX.Element => {
  const tPalette: Translations<'commandPalette'> =
    useTranslations('commandPalette')
  const tAll: Translations<''> = useTranslations()
  const locale: Locale = useLocale()
  const pathname: string = usePathname() // canonical path (no locale)
  const router: LocalizedRouter = useRouter()

  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false)

  const runCommand: (fn: () => void) => void = useCallback(
    (fn: () => void): void => {
      setOpen(false)
      fn()
    },
    []
  )

  useEffect((): (() => void) => {
    const down: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev: boolean): boolean => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return (): void => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  return (
    <CommandDialog
      description={tPalette('description')}
      open={open}
      title={tPalette('title')}
      onOpenChange={setOpen}
    >
      <CommandInput placeholder={tPalette('placeholder')} />
      <CommandList>
        <CommandEmpty>{tPalette('noResults')}</CommandEmpty>
        <NavGroup
          locale={locale}
          router={router}
          run={runCommand}
          tAll={tAll}
          tPalette={tPalette}
        />
        <SectionsGroup
          locale={locale}
          pathname={pathname}
          router={router}
          run={runCommand}
          tAll={tAll}
          tPalette={tPalette}
        />
        <ActionsGroup run={runCommand} tPalette={tPalette} />
      </CommandList>
    </CommandDialog>
  )
}
