import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Badge } from '../badge'

describe('Badge fuzzy tests', () => {
  test.prop([
    fc.record({
      variant: fc.constantFrom(
        'default',
        'destructive',
        'outline',
        'secondary'
      ),
      className: fc.string(),
      children: fc.string(),
    }),
  ])('should render without crashing', (props) => {
    expect(() => render(<Badge {...props} />)).not.toThrow()
  })
})
