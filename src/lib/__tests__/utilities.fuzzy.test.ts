import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import { cn, panic } from '../utilities'

describe('utilities fuzzy tests', () => {
  describe('cn', () => {
    test.prop([
      fc.array(
        fc.oneof(
          fc.string(),
          fc.constant(undefined),
          fc.constant(null),
          fc.boolean()
        )
      ),
    ])('should never throw', (inputs) => {
      expect(() => cn(...inputs)).not.toThrow()
    })

    test.prop([fc.string()])('should always return a string', (input) => {
      expect(typeof cn(input)).toBe('string')
    })
  })

  describe('panic', () => {
    test.prop([fc.string()])('should always throw', (message) => {
      expect(() => {
        panic(message)
      }).toThrow(message)
    })
  })
})
