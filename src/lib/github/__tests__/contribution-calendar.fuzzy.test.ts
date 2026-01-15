import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import { buildCalendar, isoDate, sumCount } from '../contribution-calendar'
import type { ContributionPoint } from '@/models/github'

describe('Contribution Calendar Fuzzy Tests', () => {
  describe('isoDate', () => {
    test.prop([fc.date()])('should return valid YYYY-MM-DD string', (date) => {
      const iso = isoDate(date)
      expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  describe('sumCount', () => {
    test.prop([
      fc.array(
        fc.record(
          {
            color: fc.string(),
            count: fc.integer({ min: 0 }),
            date: fc.string(),
            level: fc.integer(),
          },
          { requiredKeys: ['count'] }
        )
      ),
    ])('should correctly sum contributions', (points) => {
      const sum = sumCount(points as ContributionPoint[])
      const expected = points.reduce((acc, p) => acc + p.count, 0)
      expect(sum).toBe(expected)
    })
  })

  describe('buildCalendar', () => {
    test.prop([
      fc.array(
        fc.record({
          color: fc.string(),
          count: fc.integer({ min: 0 }),
          date: fc
            .date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') })
            .filter((d) => !isNaN(d.getTime()))
            .map((d) => d.toISOString().split('T')[0]),
          level: fc.integer(),
        })
      ),
      fc.string(), // locale
    ])('should build a valid calendar model', (points, locale) => {
      const calendar = buildCalendar({
        data: points as ContributionPoint[],
        locale,
      })

      if (points.length === 0) {
        expect(calendar.weeks).toHaveLength(0)
        expect(calendar.monthLabels).toHaveLength(0)
      } else {
        expect(calendar.weeks.length).toBeGreaterThan(0)
        // Verify that all days in weeks are 7
        calendar.weeks.forEach((week) => {
          expect(week.days).toHaveLength(7)
        })
      }
    })
  })
})
