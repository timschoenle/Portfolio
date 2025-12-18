import { type JSX } from 'react'

import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { siteConfig } from '@/lib/config'
import type { AsyncPageFC, FCStrict } from '@/types/fc'
import type { LocalePageProperties } from '@/types/i18n'

/* ── types ─────────────────────────────────────────────────────────────── */

interface ContactItemProperties {
  readonly href: string
  readonly icon: JSX.Element
  readonly label: string
  readonly subLabel?: string
}

type ContactSectionProperties = LocalePageProperties

/* ── subcomponents ─────────────────────────────────────────────────────── */

const ContactItem: FCStrict<ContactItemProperties> = ({
  href,
  icon,
  label,
  subLabel,
}) => (
  <a
    className="group relative flex items-center gap-4 border border-[#4A90E2]/30 bg-[#4A90E2]/5 p-4 transition-all hover:bg-[#4A90E2]/10 hover:shadow-[0_0_10px_rgba(74,144,226,0.1)]"
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-none border border-[#4A90E2] bg-[#0B1021] text-[#4A90E2] shadow-[0_0_5px_#4A90E2]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="font-mono text-sm font-bold tracking-wide text-[#E6F1FF] transition-colors group-hover:text-[#4A90E2]">
        {label}
      </span>
      {subLabel && (
        <span className="font-mono text-xs tracking-wider text-[#88B0D6] uppercase">
          {subLabel}
        </span>
      )}
    </div>

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-[#4A90E2]" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-[#4A90E2]" />
  </a>
)

/* ── main ──────────────────────────────────────────────────── */

export const ContactSection: AsyncPageFC<ContactSectionProperties> = async ({
  locale,
}: ContactSectionProperties): Promise<JSX.Element> => {
  const translations = await getTranslations({
    locale,
    namespace: 'contact',
  })

  return (
    <BlueprintContainer id="contact">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <BlueprintSectionTitle
          sectionLabel="// COMMUNICATION_CHANNELS"
          title={translations('title')}
        />

        <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Direct Comms Column */}
          <BlueprintCard label="DIRECT_UPLINK" noPadding={true}>
            <div className="flex flex-col gap-4 p-6">
              <ContactItem
                href={`mailto:${siteConfig.email}`}
                icon={<Mail className="h-5 w-5" />}
                label={translations('email')}
                subLabel={siteConfig.email}
              />
              <ContactItem
                href={`/resume-${locale}.pdf`}
                icon={<Download className="h-5 w-5" />}
                label={translations('downloadResume')}
                subLabel={translations('pdfVersion', {
                  language: locale === 'en' ? 'ENGLISH' : 'GERMAN',
                })}
              />
            </div>
          </BlueprintCard>

          {/* Network Column */}
          <BlueprintCard label="NETWORK_NODES" noPadding={true}>
            <div className="flex flex-col gap-4 p-6">
              <ContactItem
                href={siteConfig.socials.github}
                icon={<Github className="h-5 w-5" />}
                label={translations('github')}
                subLabel="SOURCE_CONTROL"
              />
              {siteConfig.socials.linkedin && (
                <ContactItem
                  href={siteConfig.socials.linkedin}
                  icon={<Linkedin className="h-5 w-5" />}
                  label={translations('linkedin')}
                  subLabel="PROFESSIONAL_NET"
                />
              )}
            </div>
          </BlueprintCard>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block border border-[#4A90E2]/20 bg-[#0B1021] px-4 py-2 font-mono text-xs tracking-[0.2em] text-[#4A90E2]/60 uppercase">
            :: END_OF_TRANSMISSION ::
          </div>
        </div>
      </div>
    </BlueprintContainer>
  )
}

export default ContactSection
