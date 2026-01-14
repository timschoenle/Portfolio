import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Dialog, DialogContent } from '../dialog'

describe('Dialog fuzzy tests', () => {
  test.prop(
    [
      fc.record(
        {
          title: fc.string(),
          description: fc.string(),
          showCloseButton: fc.boolean(),
          className: fc.string(),
        },
        { requiredKeys: [] }
      ),
    ],
    { numRuns: 25 }
  )('should render content without crashing when open', (props) => {
    expect(() =>
      render(
        <Dialog defaultOpen>
          <DialogContent {...props} />
        </Dialog>
      )
    ).not.toThrow()
  })
})
