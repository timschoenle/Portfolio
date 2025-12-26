import { type JSX } from 'react'

import { Quote } from 'lucide-react'
import Image from 'next/image'

import {
  Card,
  CARD_DECORATIONS,
  CARD_HOVERS,
  CARD_VARIANTS,
} from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import type { FCStrict } from '@/types/fc'

export interface TestimonialItem {
  readonly company: string
  readonly image: string
  readonly name: string
  readonly quote: string
  readonly role: string
}

interface TestimonialCardProperties {
  readonly item: TestimonialItem
}

export const TestimonialCard: FCStrict<TestimonialCardProperties> = ({
  item,
}: TestimonialCardProperties): JSX.Element => {
  return (
    <Card
      className="p-8"
      decorative={CARD_DECORATIONS.OVERLAY}
      hover={CARD_HOVERS.MODERATE}
      variant={CARD_VARIANTS.INTERACTIVE}
    >
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 opacity-10 transition-opacity group-hover:opacity-20"
      >
        <Quote className="h-16 w-16 text-primary" />
      </div>

      <figure className="relative z-10 flex h-full flex-col">
        <blockquote className="mb-6 flex-1 leading-relaxed text-muted-foreground italic">
          {`“${item.quote}”`}
        </blockquote>

        <figcaption className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all group-hover:ring-primary/50">
            <Image
              alt={`${item.name} avatar`}
              className="object-cover"
              fill={true}
              sizes="64px"
              src={item.image || '/placeholder.svg'}
            />
          </div>
          <div>
            <Heading as="h3" className="text-lg font-bold">
              {item.name}
            </Heading>
            <p className="text-sm text-foreground">{item.role}</p>
            <p className="text-sm text-foreground">{item.company}</p>
          </div>
        </figcaption>
      </figure>
    </Card>
  )
}
