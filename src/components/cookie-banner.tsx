'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { FCNullable, FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

/* ───────────────────────────── Types & consts ───────────────────────────── */

interface CookieConsent {
  readonly essential: true
  readonly analytics: boolean
}

const CONSENT_KEY: string = 'cookie-consent'

/* ───────────────────────────── Helpers (pure) ───────────────────────────── */

const loadConsent: () => CookieConsent | null = (): CookieConsent | null => {
  const raw: string | null =
    typeof window !== 'undefined'
      ? window.localStorage.getItem(CONSENT_KEY)
      : null
  if (raw === null) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    // Narrow carefully
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      (parsed as { essential?: unknown }).essential === true &&
      typeof (parsed as { analytics?: unknown }).analytics === 'boolean'
    ) {
      return {
        essential: true,
        analytics: (parsed as { analytics: boolean }).analytics,
      }
    }
  } catch {
    // ignore parse errors and treat as no consent
  }
  return null
}

const saveConsent: (consent: CookieConsent) => void = (
  consent: CookieConsent
): void => {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
}

/* ───────────────────────────── Subcomponents ───────────────────────────── */

interface HeaderProps {
  readonly title: string
  readonly onClose: () => void
}
const Header: FCStrict<HeaderProps> = ({
  title,
  onClose,
}: HeaderProps): JSX.Element => (
  <div className="mb-4 flex items-start justify-between">
    <h3 className="text-xl font-semibold">{title}</h3>
    <Button className="h-8 w-8" size="icon" variant="ghost" onClick={onClose}>
      <X className="h-4 w-4" />
    </Button>
  </div>
)

interface SummaryActionsProps {
  readonly t: Translations<'cookies'>
  readonly onAcceptAll: () => void
  readonly onRejectAll: () => void
  readonly onCustomize: () => void
}
const SummaryActions: FCStrict<SummaryActionsProps> = ({
  t,
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: SummaryActionsProps): JSX.Element => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <Button className="flex-1" onClick={onAcceptAll}>
      {t('acceptAll')}
    </Button>
    <Button
      className="flex-1 bg-transparent"
      variant="outline"
      onClick={onRejectAll}
    >
      {t('rejectAll')}
    </Button>
    <Button className="flex-1" variant="secondary" onClick={onCustomize}>
      {t('customize')}
    </Button>
  </div>
)

interface EssentialRowProps {
  readonly t: Translations<'cookies'>
  readonly requiredLabel: string
}
const EssentialRow: FCStrict<EssentialRowProps> = ({
  t,
  requiredLabel,
}: EssentialRowProps): JSX.Element => (
  <div className="bg-muted/50 flex items-start justify-between rounded-lg border p-4">
    <div className="flex-1">
      <h4 className="mb-1 font-medium">{t('essential')}</h4>
      <p className="text-muted-foreground text-sm">{t('essentialDesc')}</p>
    </div>
    <div className="text-muted-foreground ml-4 text-sm font-medium">
      {requiredLabel}
    </div>
  </div>
)

interface AnalyticsRowProps {
  readonly t: Translations<'cookies'>
  readonly checked: boolean
  readonly onChange: (next: boolean) => void
}
const AnalyticsRow: FCStrict<AnalyticsRowProps> = ({
  t,
  checked,
  onChange,
}: AnalyticsRowProps): JSX.Element => (
  <div className="flex items-start justify-between rounded-lg border p-4">
    <div className="flex-1">
      <h4 className="mb-1 font-medium">{t('analytics')}</h4>
      <p className="text-muted-foreground text-sm">{t('analyticsDesc')}</p>
    </div>

    <label className="relative ml-4 inline-flex cursor-pointer items-center">
      <input
        checked={checked}
        className="peer sr-only"
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onChange(e.target.checked)
        }}
      />
      <div className="bg-muted peer-focus:ring-primary/20 peer peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  </div>
)

interface CustomizeActionsProps {
  readonly t: Translations<'cookies'>
  readonly backLabel: string
  readonly onSave: () => void
  readonly onBack: () => void
}
const CustomizeActions: FCStrict<CustomizeActionsProps> = ({
  t,
  backLabel,
  onSave,
  onBack,
}: CustomizeActionsProps): JSX.Element => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <Button className="flex-1" onClick={onSave}>
      {t('save')}
    </Button>
    <Button className="flex-1" variant="outline" onClick={onBack}>
      {backLabel}
    </Button>
  </div>
)

/* ───────────────────────────── Main component ───────────────────────────── */

// eslint-disable-next-line max-lines-per-function
export const CookieBanner: FCNullable = (): JSX.Element | null => {
  const t: Translations<'cookies'> = useTranslations('cookies')

  const [showBanner, setShowBanner]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)
  const [customize, setCustomize]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)
  const [analytics, setAnalytics]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)

  // bootstrap from localStorage
  useEffect((): void => {
    const existing: CookieConsent | null = loadConsent()
    if (existing === null) {
      setShowBanner(true)
      return
    }
    setAnalytics(existing.analytics)
  }, [])

  const handleAcceptAll: () => void = useCallback((): void => {
    saveConsent({ essential: true, analytics: true })
    setShowBanner(false)
  }, [])

  const handleRejectAll: () => void = useCallback((): void => {
    saveConsent({ essential: true, analytics: false })
    setShowBanner(false)
  }, [])

  const handleSavePreferences: () => void = useCallback((): void => {
    saveConsent({ essential: true, analytics })
    setShowBanner(false)
  }, [analytics])

  if (!showBanner) {
    return null
  }

  const requiredLabel: string = t('required')
  const backLabel: string = t('back')

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4">
      <Card className="bg-background/95 pointer-events-auto w-full max-w-2xl border-2 p-6 shadow-2xl backdrop-blur-sm">
        <Header title={t('title')} onClose={handleRejectAll} />

        {!customize ? (
          <>
            <p className="text-muted-foreground mb-6 text-sm">
              {t('description')}
            </p>
            <SummaryActions
              t={t}
              onAcceptAll={handleAcceptAll}
              onCustomize={(): void => {
                setCustomize(true)
              }}
              onRejectAll={handleRejectAll}
            />
          </>
        ) : (
          <>
            <div className="mb-6 space-y-4">
              <EssentialRow requiredLabel={requiredLabel} t={t} />
              <AnalyticsRow
                checked={analytics}
                t={t}
                onChange={(next: boolean): void => {
                  setAnalytics(next)
                }}
              />
            </div>
            <CustomizeActions
              backLabel={backLabel}
              t={t}
              onBack={(): void => {
                setCustomize(false)
              }}
              onSave={handleSavePreferences}
            />
          </>
        )}
      </Card>
    </div>
  )
}
