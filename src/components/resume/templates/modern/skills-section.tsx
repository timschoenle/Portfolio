import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import { siteConfig, type Skill } from '@/lib/config'
import type { ResumeTranslations } from '@/types/resume'

import { styles } from './modern.styles'

interface SkillsSectionProperties {
  readonly translations: ResumeTranslations
}

export const SkillsSection: FC<SkillsSectionProperties> = ({
  translations,
}: SkillsSectionProperties): ReactElement => (
  <>
    <Text style={styles.sectionTitle}>
      {translations('resume.sectionTitles.skills')}
    </Text>
    <View style={styles.sectionDivider} />

    <Text style={styles.contactLabel}>
      {translations('resume.sectionTitles.skillsSubTypes.expertise')}
    </Text>
    <View style={styles.skillsContainer}>
      {siteConfig.skills.expertise.map(
        (skill: Skill): ReactElement => (
          <Text key={skill.name} style={styles.skillTag}>
            {skill.name}
          </Text>
        )
      )}
    </View>

    <Text style={styles.contactLabel}>
      {translations('resume.sectionTitles.skillsSubTypes.learning')}
    </Text>
    <View style={styles.skillsContainer}>
      {siteConfig.skills.learning.map(
        (skill: Skill): ReactElement => (
          <Text key={skill.name} style={styles.skillTag}>
            {skill.name}
          </Text>
        )
      )}
    </View>

    <Text style={styles.contactLabel}>
      {translations('resume.sectionTitles.skillsSubTypes.tools')}
    </Text>
    <View style={styles.skillsContainer}>
      {siteConfig.skills.tools.map(
        (skill: Skill): ReactElement => (
          <Text key={skill.name} style={styles.skillTag}>
            {skill.name}
          </Text>
        )
      )}
    </View>

    <Text style={styles.contactLabel}>
      {translations('resume.sectionTitles.skillsSubTypes.platforms')}
    </Text>
    <View style={styles.skillsContainer}>
      {siteConfig.skills.platforms.map(
        (skill: Skill): ReactElement => (
          <Text key={skill.name} style={styles.skillTag}>
            {skill.name}
          </Text>
        )
      )}
    </View>
  </>
)
