import type { Locale } from 'next-intl'

export type SectionId =
  | 'about'
  | 'contact'
  | 'experience'
  | 'hero'
  | 'projects'
  | 'skills'

export interface LocalizedRouter {
  back: () => void
  forward: () => void
  prefetch: (href: string) => void
  push: (href: string) => void
  refresh: () => void
  replace: (href: string) => void
}

export interface GoToSectionParameters {
  readonly locale: Locale
  readonly pathname: string
  readonly router: LocalizedRouter
  readonly sectionId: SectionId
}

export interface CreatePushHandlerParameters {
  readonly href: '/' | '/imprint' | '/privacy'
  readonly locale: Locale
  readonly router: LocalizedRouter
  readonly run: (function_: () => void) => void
}

export interface CreateOnSelectSectionParameters {
  readonly locale: Locale
  readonly pathname: string
  readonly router: LocalizedRouter
  readonly run: (function_: () => void) => void
  readonly sectionId: SectionId
}

/* ────────────────────────────── helpers ──────────────────────────────── */

/**
 * Scrolls smoothly to a specific section on the page.
 *
 * @param identifier - The HTML ID of the section to scroll to.
 */
export function scrollToSection(identifier: string): void {
  const element: HTMLElement | null = document.querySelector(`#${identifier}`)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Navigates to a specific section, handling both intra-page scrolling and cross-page navigation.
 *
 * @param params - Navigation parameters.
 * @param params.locale - The current locale.
 * @param params.pathname - The current pathname.
 * @param params.router - The Next.js router instance.
 * @param params.sectionId - The ID of the target section.
 */
export function goToSection({
  locale,
  pathname,
  router,
  sectionId,
}: GoToSectionParameters): void {
  const isHomePage: boolean = pathname === `/${locale}`
  if (isHomePage) {
    scrollToSection(sectionId)
  } else {
    // Navigate to home and then scroll
    router.push(`/${locale}#${sectionId}`)
  }
}

/**
 * Opens a URL in a new tab with security best practices.
 *
 * @param url - The URL to open.
 */
export function openNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Triggers the browser's email client.
 *
 * @param email - The destination email address.
 */
export function sendMailTo(email: string): void {
  window.location.href = `mailto:${email}`
}

/* factories to satisfy unicorn/consistent-function-scoping */

/**
 * Creates a handler for router push navigation.
 *
 * @param params - Handler parameters.
 * @returns A void-returning function suitable for use in event handlers.
 */
export function createPushHandler({
  href,
  locale,
  router,
  run,
}: CreatePushHandlerParameters): (_value: string) => void {
  return (): void => {
    run((): void => {
      router.push(`/${locale}${href}`)
    })
  }
}

/**
 * Creates a handler for section selection from the command palette.
 *
 * @param params - Handler parameters.
 * @returns A void-returning function suitable for use in event handlers.
 */
export function createOnSelectSection({
  locale,
  pathname,
  router,
  run,
  sectionId,
}: CreateOnSelectSectionParameters): (_value: string) => void {
  return (): void => {
    run((): void => {
      goToSection({ locale, pathname, router, sectionId })
    })
  }
}
