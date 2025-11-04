'use server'

import type { Metadata } from 'next'
import { type Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import LegalPageLayout from '@/components/legal-page-layout'

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PrivacyPolicyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'privacy' })

  const controller = {
    title: t('controller.title'),
    name: t('controller.name'),
    address: t('controller.address'),
    email: t('controller.email'),
  }

  const cloudflare = {
    title: t('cloudflare.title'),
    pre: t('cloudflare.pre'),
    strong: t('cloudflare.strong'),
    post: t('cloudflare.post'),
    provider: t('cloudflare.provider'),
    policyLink: t('cloudflare.policyLink'),
    text: t('cloudflare.text'),
  }

  const sections = {
    general: { title: t('general.title'), text: t('general.text') },
    logs: { title: t('logs.title'), text: t('logs.text') },
    contact: { title: t('contact.title'), text: t('contact.text') },
    rights: { title: t('rights.title'), text: t('rights.text') },
    nocookies: { title: t('nocookies.title'), text: t('nocookies.text') },
    changes: { title: t('changes.title'), text: t('changes.text') },
  }

  return (
    <LegalPageLayout locale={locale} title={t('title')}>
      <div>
        <h2 className="mb-2 text-xl font-semibold">{controller.title}</h2>
        <p className="text-muted-foreground">
          <strong>Name:</strong> {controller.name}
          <br />
          <strong>Address:</strong> {controller.address}
          <br />
          <strong>Email:</strong>{' '}
          <a
            className="text-primary hover:underline"
            href={`mailto:${controller.email}`}
          >
            {controller.email}
          </a>
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">{cloudflare.title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {cloudflare.pre} <strong>{cloudflare.strong}</strong>{' '}
          {cloudflare.post}
        </p>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          {cloudflare.provider}
        </p>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          <a
            className="text-primary hover:underline"
            href={cloudflare.policyLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {cloudflare.policyLink}
          </a>
        </p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {cloudflare.text}
        </p>
      </div>

      {Object.entries(sections).map(([key, section]) => (
        <div key={key}>
          <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {section.text}
          </p>
        </div>
      ))}
    </LegalPageLayout>
  )
}
