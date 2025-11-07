'use server'

import { Download, FileText, GitBranch, Mail, MapPin } from 'lucide-react'
import { type Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { type JSX } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/lib/config'
import type { FCAsync, FCStrict, NoChildren } from '@/types/fc'
import type { Translations } from '@/types/i18n'

/* ─────────────────────────────── types ─────────────────────────────── */

interface ContactSectionProps extends NoChildren {
  readonly locale: Locale
}

interface InfoItemProps {
  readonly icon: JSX.Element
  readonly label: string
  readonly content: JSX.Element
}

interface InfoCardProps {
  readonly t: Translations<'contact'>
}

interface ResumeCardProps {
  readonly t: Translations<'contact'>
  readonly locale: Locale
}

/* ───────────────────────────── subviews ───────────────────────────── */

const InfoItem: FCStrict<InfoItemProps> = ({
  icon,
  label,
  content,
}: InfoItemProps): JSX.Element => {
  return (
    <div className="group hover:bg-muted/50 flex items-center gap-4 rounded-lg p-3 transition-all">
      <div className="from-primary/10 to-primary/5 rounded-lg bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        {content}
      </div>
    </div>
  )
}

const InfoCard: FCStrict<InfoCardProps> = ({
  t,
}: InfoCardProps): JSX.Element => {
  return (
    <Card className="border-2 shadow-xl">
      <CardContent className="p-8">
        <h3 className="mb-6 text-2xl font-bold">{t('infoTitle')}</h3>

        <div className="space-y-6">
          <InfoItem
            content={
              <a
                className="text-foreground hover:text-primary text-lg font-medium transition-colors"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            }
            icon={<Mail className="text-primary h-6 w-6" />}
            label={t('email')}
          />

          <InfoItem
            content={
              <a
                className="text-foreground hover:text-primary text-lg font-medium transition-colors"
                href={siteConfig.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`@${siteConfig.githubUsername}`}
              </a>
            }
            icon={<GitBranch className="text-primary h-6 w-6" />}
            label={t('github')}
          />

          <InfoItem
            content={
              <p className="text-foreground text-lg font-medium">
                {t('locationValue')}
              </p>
            }
            icon={<MapPin className="text-primary h-6 w-6" />}
            label={t('location')}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const ResumeCard: FCStrict<ResumeCardProps> = ({
  t,
  locale,
}: ResumeCardProps): JSX.Element => {
  const resumePath: string =
    locale === 'de' ? '/resume-de.pdf' : '/resume-en.pdf'
  const languageName: string = locale === 'de' ? 'Deutsch' : 'English'
  const pdfLabel: string = `PDF • ${languageName}`

  return (
    <Card className="overflow-hidden border-2 shadow-xl">
      <div className="from-primary/20 via-primary/10 to-primary/5 bg-gradient-to-br p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-3">
              <FileText className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="text-foreground text-xl font-bold">
                {t('downloadResume')}
              </h3>
              <p className="text-muted-foreground text-sm">{pdfLabel}</p>
            </div>
          </div>
        </div>

        <Button
          asChild={true}
          className="group bg-primary hover:bg-primary/90 w-full shadow-lg transition-all hover:shadow-xl"
          size="lg"
        >
          <a download={true} href={resumePath}>
            <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-0.5 group-hover:scale-110" />
            {t('downloadResume')}
          </a>
        </Button>
      </div>
    </Card>
  )
}

/* ───────────────────────────── main FC ────────────────────────────── */

export const ContactSection: FCAsync<ContactSectionProps> = async ({
  locale,
}: ContactSectionProps): Promise<JSX.Element> => {
  const t: Translations<'contact'> = await getTranslations({
    locale,
    namespace: 'contact',
  })

  return (
    <section className="bg-muted/30 relative px-4 py-20" id="contact">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-3 text-4xl font-bold">
            {t('title')}
          </h2>
          <div className="from-primary to-primary/60 mx-auto h-1 w-20 rounded-full bg-gradient-to-r" />
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <InfoCard t={t} />
          <ResumeCard locale={locale} t={t} />
        </div>
      </div>
    </section>
  )
}
