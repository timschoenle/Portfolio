import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Input } from '../input'

describe('Input fuzzy tests', () => {
  test.prop([
    fc.record({
      type: fc.string(),
      className: fc.string(),
      disabled: fc.boolean(),
      placeholder: fc.string(),
    }),
  ])('should render without crashing', (props) => {
    expect(() => render(<Input {...props} />)).not.toThrow()
  })
})
