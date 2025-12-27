import { type JSX } from 'react'

import { BlueprintProjectCard } from '@/components/sections/projects/project-card'
import type { GitHubProject } from '@/models/github'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

interface FeaturedProjectsProperties {
  readonly projects: readonly GitHubProject[]
  readonly translations: Translations<'projects'>
}

export const FeaturedProjects: FCStrict<FeaturedProjectsProperties> = ({
  projects,
  translations,
}: FeaturedProjectsProperties): JSX.Element => (
  <div className="mt-12 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map(
      (project: GitHubProject): JSX.Element => (
        <BlueprintProjectCard
          description={project.description ?? ''}
          key={project.name}
          language={project.language ?? 'Unknown'}
          name={project.name}
          stats={{
            forks: project.forks_count,
            stars: project.stargazers_count,
          }}
          url={project.html_url}
          viewProject={translations('view')}
        />
      )
    )}
  </div>
)
