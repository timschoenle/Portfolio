import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Command, CommandDialog, CommandInput } from '../command'

describe('Command fuzzy tests', () => {
  test.prop([
    fc.record(
      {
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('Command root should render without crashing', (props) => {
    expect(() => render(<Command {...props} />)).not.toThrow()
  })

  test.prop([
    fc.record(
      {
        className: fc.string(),
        placeholder: fc.string(),
        disabled: fc.boolean(),
      },
      { requiredKeys: [] }
    ),
  ])('CommandInput should render without crashing', (props) => {
    expect(() =>
      render(
        <Command>
          <CommandInput {...props} />
        </Command>
      )
    ).not.toThrow()
  })

  test.prop(
    [
      fc.record(
        {
          title: fc.string(),
          description: fc.string(),
          showCloseButton: fc.boolean(),
          className: fc.string(),
        },
        { requiredKeys: ['title', 'description'] }
      ),
    ],
    { numRuns: 25 }
  )('CommandDialog should render without crashing when open', (props) => {
    expect(() => render(<CommandDialog defaultOpen {...props} />)).not.toThrow()
  })
})
