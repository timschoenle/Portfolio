import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { ExperienceSection } from '@/components/experience-section'
import { HeroSection } from '@/components/hero-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsSection } from '@/components/skills-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { siteConfig } from '@/lib/config'
import {
  getContributionData,
  getFeaturedProjects,
  getUserStats,
} from '@/lib/github'

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Fetch GitHub data in parallel for better performance
  const [projects, stats, contributionData] = await Promise.all([
    getFeaturedProjects(siteConfig.githubUsername, siteConfig.featuredRepos),
    getUserStats(siteConfig.githubUsername),
    getContributionData(siteConfig.githubUsername),
  ])

  return (
    <main className="bg-background h-screen snap-y snap-mandatory overflow-y-scroll">
        <HeroSection locale={locale} />
        <div className="snap-start">
          <AboutSection locale={locale} />
          <SkillsSection locale={locale} />
          <ProjectsSection
            contributionData={contributionData}
            githubUsername={siteConfig.githubUsername}
            locale={locale}
            projects={projects}
            stats={stats}
          />
          <ExperienceSection locale={locale} />
          <TestimonialsSection locale={locale} />
          <ContactSection locale={locale} />
        </div>
      </main>
  )
}
