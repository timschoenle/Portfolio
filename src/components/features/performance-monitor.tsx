'use client'

import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useEffect,
  useState,
} from 'react'

import { useReportWebVitals } from 'next/web-vitals'

import { type FCNullable } from '@/types/fc'

interface Metric {
  readonly name: string
  readonly unit: string
  readonly value: number
}

const COLOR_POOR: string = 'text-red-400'
const COLOR_GOOD: string = 'text-emerald-400'
const COLOR_NEUTRAL: string = 'text-brand/60'
const LOADING_TEXT: string = 'GATHERING_DATA...'
const HEADER_TEXT: string = 'SYS_METRICS :: LIVE'

const METRIC_THRESHOLDS: Map<string, number> = new Map<string, number>([
  ['CLS', 0.1],
  ['FID', 100],
  ['INP', 200],
  ['LCP', 2500],
  ['TTFB', 800],
])

const getMetricColor: (name: string, value: number) => string = (
  name: string,
  value: number
): string => {
  const threshold: number | undefined = METRIC_THRESHOLDS.get(name)

  if (threshold === undefined) {
    return COLOR_NEUTRAL
  }

  return value > threshold ? COLOR_POOR : COLOR_GOOD
}

const usePerformanceMetrics: () => Record<string, Metric> = (): Record<
  string,
  Metric
> => {
  const [metrics, setMetrics]: [
    Record<string, Metric>,
    Dispatch<SetStateAction<Record<string, Metric>>>,
  ] = useState<Record<string, Metric>>({})

  useEffect((): void => {
    // Add generic load time if available
    if (typeof window !== 'undefined') {
      const navigationEntries: PerformanceEntryList =
        window.performance.getEntriesByType('navigation')

      if (navigationEntries.length > 0) {
        const navEntry: PerformanceEntry | undefined = navigationEntries[0]
        const timingDetails: PerformanceNavigationTiming =
          navEntry as PerformanceNavigationTiming

        setMetrics(
          (
            previousMetrics: Record<string, Metric>
          ): Record<string, Metric> => ({
            ...previousMetrics,
            load: {
              name: 'LOAD',
              unit: 'ms',
              value: Math.round(
                timingDetails.loadEventEnd - timingDetails.startTime
              ),
            },
          })
        )
      }
    }
  }, [])

  useReportWebVitals((metric: { name: string; value: number }): void => {
    // Only track core vitals we care about to reduce noise
    if (['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'].includes(metric.name)) {
      setMetrics(
        (previousMetrics: Record<string, Metric>): Record<string, Metric> => ({
          ...previousMetrics,
          [metric.name]: {
            name: metric.name,
            unit: metric.name === 'CLS' ? '' : 'ms',
            value:
              metric.name === 'CLS' ? metric.value : Math.round(metric.value), // CLS is small float
          },
        })
      )
    }
  })

  return metrics
}

const formatValue: (name: string, value: number) => string = (
  name: string,
  value: number
): string => {
  return name === 'CLS' ? value.toFixed(4) : String(value)
}

export const PerformanceMonitor: FCNullable = (): JSX.Element | null => {
  const metrics: Record<string, Metric> = usePerformanceMetrics()
  const [mounted, setMounted]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false)

  useEffect((): void => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sortedMetrics: Metric[] = Object.values(metrics).toSorted(
    (metricA: Metric, metricB: Metric): number =>
      metricA.name.localeCompare(metricB.name)
  )

  return (
    <div className="flex flex-col gap-1 font-mono text-[10px] tracking-wider text-brand/40 uppercase tabular-nums transition-opacity hover:opacity-100 md:text-right">
      <div className="mb-1 font-bold text-brand/60">{HEADER_TEXT}</div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 md:flex md:flex-col md:gap-0.5">
        {sortedMetrics.map(
          (metric: Metric): JSX.Element => (
            <div className="flex justify-between gap-4" key={metric.name}>
              <span>{metric.name}</span>
              <span className={getMetricColor(metric.name, metric.value)}>
                {formatValue(metric.name, metric.value)}
                {metric.unit}
              </span>
            </div>
          )
        )}
        {Object.keys(metrics).length === 0 && (
          <div className="animate-pulse">{LOADING_TEXT}</div>
        )}
      </div>
    </div>
  )
}
