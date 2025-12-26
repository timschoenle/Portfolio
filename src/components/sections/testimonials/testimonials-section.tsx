import { type JSX } from 'react'

import { type Locale } from 'next-intl'

import { getTranslations } from 'next-intl/server'

import { Section, SECTION_BACKGROUNDS } from '@/components/ui/section/section'
import { SectionContainer } from '@/components/ui/section/section-container'
import { SectionHeader } from '@/components/ui/section/section-header'
import type { AsyncPageFC } from '@/types/fc'
import type { Translations } from '@/types/i18n'

import { TestimonialCard, type TestimonialItem } from './testimonial-card'

/* ───────────────────────── types ───────────────────────── */

interface TestimonialsSectionProperties {
  readonly locale: Locale
  readonly performance?: boolean
}

/* ───────────────────── type guards/helpers ───────────────────── */

const isString: (value: unknown) => value is string = (
  value: unknown
): value is string => typeof value === 'string'

const isTestimonialItem: (v: unknown) => v is TestimonialItem = (
  value: unknown
): value is TestimonialItem => {
  if (value === null || typeof value !== 'object') {
    return false
  }
  const object: Record<string, unknown> = value as Record<string, unknown>
  return (
    isString(object['name']) &&
    isString(object['role']) &&
    isString(object['company']) &&
    isString(object['image']) &&
    isString(object['quote'])
  )
}

const makeKey: (testimonialItem: TestimonialItem) => string = (
  testimonialItem: TestimonialItem
): string =>
  `${testimonialItem.name}::${testimonialItem.company}::${testimonialItem.image}`

/* ───────────────────── main component ───────────────────── */

export const TestimonialsSection: AsyncPageFC<
  TestimonialsSectionProperties
> = async ({ locale }: TestimonialsSectionProperties): Promise<JSX.Element> => {
  const translations: Translations<'testimonials'> = await getTranslations({
    locale,
    namespace: 'testimonials',
  })

  // Safely parse raw items to avoid unsafe assignments
  const raw: unknown = translations.raw('items')
  const testimonials: readonly TestimonialItem[] = Array.isArray(raw)
    ? (raw as unknown[])
        .filter((element: unknown): element is TestimonialItem =>
          isTestimonialItem(element)
        )
        .slice(0, 6)
    : []

  const titleText: string = translations('title')
  const subtitleText: string = translations('subtitle')

  return (
    <Section
      background={SECTION_BACKGROUNDS.GRADIENT}
      className="min-h-screen"
      id="testimonials"
      isEmpty={testimonials.length === 0}
      performance={true}
    >
      <SectionContainer size="xl">
        <SectionHeader
          gradient={true}
          subtitle={subtitleText}
          title={titleText}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(
            (item: TestimonialItem): JSX.Element => (
              <TestimonialCard item={item} key={makeKey(item)} />
            )
          )}
        </div>
      </SectionContainer>
    </Section>
  )
}
