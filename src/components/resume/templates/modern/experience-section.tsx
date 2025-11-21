import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import type { ResumeExperience, ResumeTranslations } from '@/types/resume'

import { styles } from './modern.styles'

interface ExperienceSectionProperties {
  readonly translations: ResumeTranslations
}

/**
 * Calculates the maximum number of achievements to display per experience entry
 * based on total content density to prevent overflow.
 */
function calculateMaxAchievementsPerEntry(
  experiences: ResumeExperience[]
): number {
  const totalAchievements: number = experiences.reduce(
    (sum: number, exp: ResumeExperience): number =>
      sum + exp.achievements.length,
    0
  )

  // Heavy content: 4+ experiences with 12+ total achievements
  if (experiences.length >= 4 && totalAchievements > 12) {
    return 2
  }

  // Moderate content: 3 experiences with 9+ total achievements
  if (experiences.length === 3 && totalAchievements > 9) {
    return 3
  }

  // Light content: show all achievements
  return Number.POSITIVE_INFINITY
}

// eslint-disable-next-line max-lines-per-function
export const ExperienceSection: FC<ExperienceSectionProperties> = ({
  translations,
}: ExperienceSectionProperties): ReactElement => {
  const experiences: ResumeExperience[] = translations.raw(
    'resume.experience'
  ) as ResumeExperience[]

  // Use compact styles if there are more than 2 experience entries
  const isCompact: boolean = experiences.length > 2

  // Calculate max achievements per entry to prevent overflow
  const maxAchievementsPerEntry: number =
    calculateMaxAchievementsPerEntry(experiences)

  return (
    <>
      <Text style={styles.sectionTitleFirst}>
        {translations('resume.sectionTitles.experience')}
      </Text>
      <View style={styles.sectionDivider} />
      {experiences.map(
        (exp: ResumeExperience, index: number): ReactElement => (
          <View
            key={`${exp.company}-${index.toString()}`}
            style={
              isCompact ? styles.experienceItemCompact : styles.experienceItem
            }
          >
            <View
              style={isCompact ? styles.jobHeaderCompact : styles.jobHeader}
            >
              <Text
                style={isCompact ? styles.jobTitleCompact : styles.jobTitle}
              >
                {exp.title}
              </Text>
              <Text
                style={isCompact ? styles.dateTextCompact : styles.dateText}
              >
                {exp.startDate}
                {' - '}
                {exp.endDate}
              </Text>
            </View>
            <View style={styles.companyRow}>
              <Text
                style={
                  isCompact ? styles.companyTextCompact : styles.companyText
                }
              >
                {exp.company}
                {' • '}
                {exp.location}
              </Text>
            </View>
            {exp.achievements.slice(0, maxAchievementsPerEntry).map(
              (achievement: string, achievementIndex: number): ReactElement => (
                <Text
                  key={`achievement_${achievementIndex.toString()}`}
                  style={
                    isCompact ? styles.achievementCompact : styles.achievement
                  }
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
}
