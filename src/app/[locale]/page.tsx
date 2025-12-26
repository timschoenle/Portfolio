import { type JSX } from 'react'

import { type Locale } from 'next-intl'

import { setRequestLocale } from 'next-intl/server'

import { AboutSection } from '@/components/sections/about/about-section'
import { ContactSection } from '@/components/sections/contact/contact-section'
import { ExperienceSection } from '@/components/sections/experience/experience-section'
import { HeroSection } from '@/components/sections/hero/hero-section'
import { ProjectsSection } from '@/components/sections/projects/projects-section'
import { SkillsSection } from '@/components/sections/skills/skills-section'
import { ensureLocaleFromParameters } from '@/i18n/locale'
import type { UnparsedLocalePageProperties } from '@/types/i18n'
import type { PageParameters, RoutePageFC } from '@/types/page'

type HomeProperties = UnparsedLocalePageProperties

const Home: RoutePageFC<HomeProperties> = async ({
  params,
}: PageParameters<HomeProperties>): Promise<JSX.Element> => {
  const locale: Locale = await ensureLocaleFromParameters(params)
  setRequestLocale(locale)

  return (
    <main className="bg-background">
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  )
}

export default Home
