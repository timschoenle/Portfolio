import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Button } from '../button'

describe('Button fuzzy tests', () => {
  test.prop([
    fc.record({
      variant: fc.constantFrom(
        'default',
        'destructive',
        'ghost',
        'link',
        'outline',
        'secondary'
      ),
      size: fc.constantFrom(
        'default',
        'icon-lg',
        'icon-sm',
        'icon',
        'lg',
        'sm'
      ),
      className: fc.string(),
      disabled: fc.boolean(),
      children: fc.string(),
    }),
  ])('should render without crashing', (props) => {
    expect(() => render(<Button {...props} />)).not.toThrow()
  })
})
