import { type FC, type ReactElement } from 'react'

import { Page, Text, View } from '@react-pdf/renderer'

import type {
  ResumeData,
  ResumePersonalInfo,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

import { ContactSection } from './modern/ContactSection'
import { EducationSection } from './modern/EducationSection'
import { ExperienceSection } from './modern/ExperienceSection'
import { styles } from './modern/modern.styles'
import { ProjectsSection } from './modern/ProjectsSection'
import { SkillsSection } from './modern/SkillsSection'

interface ModernTemplateProperties {
  readonly data: ResumeData
  readonly translations: ResumeSectionTitleTranslations
}

export const ModernTemplate: FC<ModernTemplateProperties> = ({
  data,
  translations,
}: ModernTemplateProperties): ReactElement => {
  const personalInfo: ResumePersonalInfo = data.personalInfo ?? {
    email: '',
    github: '',
    location: '',
    name: '',
    title: '',
  }

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topHeader}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      <View style={styles.mainContainer}>
        {/* Left sidebar */}
        <View style={styles.leftColumn}>
          <ContactSection
            personalInfo={personalInfo}
            translations={translations}
          />
          <SkillsSection skills={data.skills} translations={translations} />
          <EducationSection
            education={data.education}
            translations={translations}
          />
        </View>

        {/* Main content */}
        <View style={styles.rightColumn}>
          <ExperienceSection
            experience={data.experience}
            translations={translations}
          />
          <ProjectsSection
            projects={data.projects}
            translations={translations}
          />
        </View>
      </View>
    </Page>
  )
}
