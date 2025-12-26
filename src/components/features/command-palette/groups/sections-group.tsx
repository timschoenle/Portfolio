import { type JSX } from 'react'

import { type Locale } from 'next-intl'

import { Briefcase, Code, type LucideIcon, Mail, User, Zap } from 'lucide-react'

import {
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command'
import type { Translations } from '@/types/i18n'

import {
  createOnSelectSection,
  type LocalizedRouter,
  type SectionId,
} from '../utils/actions'

interface SectionConfig {
  readonly icon: LucideIcon
  readonly id: SectionId
  readonly keywords: readonly string[]
  readonly shortcut: string
  readonly titleKey:
  | 'about.title'
  | 'resume.sectionTitles.contact'
  | 'resume.sectionTitles.experience'
  | 'resume.sectionTitles.projects'
  | 'resume.sectionTitles.skills'
}

const SECTIONS_CONFIG: readonly SectionConfig[] = [
  {
    icon: User,
    id: 'about',
    keywords: ['about', 'me', 'profile'],
    shortcut: 'A',
    titleKey: 'about.title',
  },
  {
    icon: Zap,
    id: 'skills',
    keywords: ['skills', 'tech', 'stack'],
    shortcut: 'K',
    titleKey: 'resume.sectionTitles.skills',
  },
  {
    icon: Code,
    id: 'projects',
    keywords: ['projects', 'work', 'portfolio'],
    shortcut: 'P',
    titleKey: 'resume.sectionTitles.projects',
  },
  {
    icon: Briefcase,
    id: 'experience',
    keywords: ['experience', 'history', 'career'],
    shortcut: 'X',
    titleKey: 'resume.sectionTitles.experience',
  },
  {
    icon: Mail,
    id: 'contact',
    keywords: ['contact', 'email', 'message'],
    shortcut: 'C',
    titleKey: 'resume.sectionTitles.contact',
  },
]

interface SectionsGroupProperties {
  readonly locale: Locale
  readonly pathname: string
  readonly router: LocalizedRouter
  readonly run: (function_: () => void) => void
  readonly tAll: Translations<''>
  readonly tPalette: Translations<'commandPalette'>
}

export const SectionsGroup: React.FC<SectionsGroupProperties> = ({
  locale,
  pathname,
  router,
  run,
  tAll,
  tPalette,
}: SectionsGroupProperties): JSX.Element => (
  <CommandGroup heading={tPalette('sections.heading')}>
    {SECTIONS_CONFIG.map(
      (section: SectionConfig): JSX.Element => (
        <CommandItem
          key={section.id}
          keywords={[...section.keywords]}
          value={section.id}
          onSelect={createOnSelectSection({
            locale,
            pathname,
            router,
            run,
            sectionId: section.id,
          })}
        >
          <section.icon className="mr-2 h-4 w-4" />
          <span>{tAll(section.titleKey)}</span>
          <CommandShortcut>{section.shortcut}</CommandShortcut>
        </CommandItem>
      )
    )}
  </CommandGroup>
)
