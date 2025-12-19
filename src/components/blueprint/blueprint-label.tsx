import {
  type CSSProperties,
  type ElementType,
  type JSX,
  type ReactNode,
} from 'react'

import type { FCWithRequiredChildren } from '@/types/fc'

interface BlueprintLabelProperties {
  readonly as?: 'div' | 'p' | 'span'
  readonly className?: string
  readonly style?: CSSProperties
}

export const BlueprintLabel: FCWithRequiredChildren<
  BlueprintLabelProperties
> = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  as = 'div',
  children,
  className,
  style,
}: BlueprintLabelProperties & {
  readonly children: ReactNode
}): JSX.Element => {
  const Component: ElementType = as

  return (
    <Component aria-hidden="true" className={className} style={style}>
      {children}
    </Component>
  )
}
