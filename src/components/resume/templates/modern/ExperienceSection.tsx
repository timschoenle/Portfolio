import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import type {
  ResumeExperience,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

import { styles } from './modern.styles'

interface ExperienceSectionProperties {
  readonly experience: readonly ResumeExperience[]
  readonly translations: ResumeSectionTitleTranslations
}

export const ExperienceSection: FC<ExperienceSectionProperties> = ({
  experience,
  translations,
}: ExperienceSectionProperties): ReactElement => (
  <>
    <Text style={styles.sectionTitleFirst}>{translations.experience}</Text>
    <View style={styles.sectionDivider} />
    {experience.map(
      (exp: ResumeExperience, index: number): ReactElement => (
        <View
          key={`${exp.company}-${index.toString()}`}
          style={styles.experienceItem}
        >
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{exp.title}</Text>
            <Text style={styles.dateText}>
              {exp.startDate}
              {' - '}
              {exp.endDate}
            </Text>
          </View>
          <View style={styles.companyRow}>
            <Text style={styles.companyText}>
              {exp.company}
              {' • '}
              {exp.location}
            </Text>
          </View>
          {exp.achievements.map(
            (achievement: string, achievementIndex: number): ReactElement => (
              <Text
                key={`achievement_${achievementIndex.toString()}`}
                style={styles.achievement}
              >
                {'• '}
                {achievement}
              </Text>
            )
          )}
        </View>
      )
    )}
  </>
)
