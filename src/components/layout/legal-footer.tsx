'use server'

import { type JSX } from 'react'

import { getTranslations } from 'next-intl/server'

import { environment } from '@/environment'
import { Link } from '@/i18n/routing'
import { siteConfig } from '@/lib/config'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

type LegalFooterProperties = LocalePageProperties

export const LegalFooter: AsyncPageFC<LegalFooterProperties> = async ({
  locale,
}: LegalFooterProperties): Promise<JSX.Element> => {
  const translations: Translations<''> = await getTranslations({ locale })
  const currentYear: number = new Date().getFullYear()
  const revision: string | undefined = environment.NEXT_PUBLIC_REVISION

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#4A90E2]/30 bg-[#0B1021] text-[#E6F1FF]">
      {/* Blueprint Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4A90E2 1px, transparent 1px), linear-gradient(90deg, #4A90E2 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Technical Top Border Details */}
      <div className="absolute top-0 left-0 h-px w-full bg-[#4A90E2]/30">
        <div className="absolute top-0 left-[10%] h-2 w-px bg-[#4A90E2]" />
        <div className="absolute top-0 left-[20%] h-1 w-px bg-[#4A90E2]/50" />
        <div className="absolute top-0 right-[10%] h-2 w-px bg-[#4A90E2]" />
        <div className="absolute top-0 right-[20%] h-1 w-px bg-[#4A90E2]/50" />
        <div className="absolute top-0 left-1/2 h-[1px] w-24 -translate-x-1/2 bg-[#4A90E2] shadow-[0_0_10px_#4A90E2]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-12 md:h-32 md:py-0">
        {/* Left Block: Copyright & System Status (Absolute Left on Desktop) */}
        <div className="order-2 mt-8 flex flex-col gap-4 text-center md:absolute md:left-[var(--app-padding)] md:order-1 md:mt-0 md:items-start md:text-left">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-bold tracking-widest text-[#4A90E2] uppercase">
              // {siteConfig.fullName}
            </div>
            <div className="text-[10px] text-[#4A90E2]/80">
              © {currentYear} :: ALL_RIGHTS_RESERVED
            </div>
          </div>
          <div className="inline-flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
            <span className="font-mono text-[10px] text-[#4A90E2]/60">
              SYS_READY :: v{revision ?? '1.0.0'}
            </span>
          </div>
        </div>

        {/* Center Block: Navigation (Strictly Centered) */}
        <nav
          aria-label="Legal navigation"
          className="order-1 flex items-center gap-px border border-[#4A90E2]/20 bg-[#0B1021]/50 backdrop-blur-md md:order-2"
        >
          <Link
            className="group relative px-8 py-3 transition-all hover:bg-[#4A90E2]/10"
            href="/imprint"
            prefetch={false}
          >
            <span className="font-mono text-xs tracking-wider text-[#4A90E2]/70 transition-colors group-hover:text-[#4A90E2]">
              {translations('imprint.title').toUpperCase()}
            </span>
            {/* Corner Accent */}
            <span className="absolute top-0 left-0 h-1 w-1 border-t border-l border-[#4A90E2] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          <div className="h-4 w-px bg-[#4A90E2]/20" />

          <Link
            className="group relative px-8 py-3 transition-all hover:bg-[#4A90E2]/10"
            href="/privacy"
            prefetch={false}
          >
            <span className="font-mono text-xs tracking-wider text-[#4A90E2]/70 transition-colors group-hover:text-[#4A90E2]">
              {translations('privacy.title').toUpperCase()}
            </span>
            {/* Corner Accent */}
            <span className="absolute right-0 bottom-0 h-1 w-1 border-r border-b border-[#4A90E2] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </nav>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#4A90E2]/20 to-transparent" />
    </footer>
  )
}
