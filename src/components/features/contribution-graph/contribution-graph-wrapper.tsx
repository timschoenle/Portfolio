'use client'

import { type ComponentType, type JSX } from 'react'

import dynamic from 'next/dynamic'

import type * as ContributionGraphModule from '@/components/features/contribution-graph/contribution-graph-client'
import type { FCStrict } from '@/types/fc'

const ContributionGraphLazy: ComponentType<ContributionGraphModule.ContributionGraphClientProperties> =
  dynamic(
    async (): Promise<
      FCStrict<ContributionGraphModule.ContributionGraphClientProperties>
    > =>
      import('@/components/features/contribution-graph/contribution-graph-client').then(
        (
          module_: typeof ContributionGraphModule
        ): FCStrict<ContributionGraphModule.ContributionGraphClientProperties> =>
          module_.ContributionGraphClient
      ),
    {
      loading: (): JSX.Element => (
        <div className="h-[180px] w-full animate-pulse rounded-lg bg-blueprint-card-bg/50" />
      ),
      ssr: false,
    }
  )

export const ContributionGraphWrapper: FCStrict<
  ContributionGraphModule.ContributionGraphClientProperties
> = (
  properties: ContributionGraphModule.ContributionGraphClientProperties
): JSX.Element => <ContributionGraphLazy {...properties} />
