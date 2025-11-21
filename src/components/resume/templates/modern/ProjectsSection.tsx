import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import type {
  ResumeProject,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

import { styles } from './modern.styles'

interface ProjectsSectionProperties {
  readonly projects: readonly ResumeProject[]
  readonly translations: ResumeSectionTitleTranslations
}

export const ProjectsSection: FC<ProjectsSectionProperties> = ({
  projects,
  translations,
}: ProjectsSectionProperties): ReactElement => (
  <>
    <Text style={styles.sectionTitle}>{translations.projects}</Text>
    <View style={styles.sectionDivider} />
    {projects.map(
      (project: ResumeProject, index: number): ReactElement => (
        <View
          key={`${project.name}-${index.toString()}`}
          style={styles.projectItem}
        >
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <Text style={styles.projectTech}>
            {project.technologies.join(' • ')}
          </Text>
        </View>
      )
    )}
  </>
)
