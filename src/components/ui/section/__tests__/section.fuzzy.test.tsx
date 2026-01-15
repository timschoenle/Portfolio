import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Section, SECTION_BACKGROUNDS } from '../section'
import { SectionHeader } from '../section-header'

describe('Section Fuzzy Tests', () => {
  test.prop([
    fc.record(
      {
        background: fc.constantFrom(...Object.values(SECTION_BACKGROUNDS)),
        className: fc.string(),
        isEmpty: fc.boolean(),
        performance: fc.boolean(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('Section should render without crashing', (props) => {
    expect(() => render(<Section {...props} />)).not.toThrow()
  })
})

describe('SectionHeader Fuzzy Tests', () => {
  test.prop([
    fc.record(
      {
        align: fc.constantFrom('center', 'left', 'right'),
        className: fc.string(),
        gradient: fc.boolean(),
        subtitle: fc.string(),
        title: fc.string(),
        underline: fc.boolean(),
      },
      { requiredKeys: ['title'] }
    ),
  ])('SectionHeader should render without crashing', (props) => {
    expect(() => render(<SectionHeader {...props} />)).not.toThrow()
  })
})
