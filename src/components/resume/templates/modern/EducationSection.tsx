import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import type {
  ResumeEducation,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

import { styles } from './modern.styles'

interface EducationSectionProperties {
  readonly education: readonly ResumeEducation[]
  readonly translations: ResumeSectionTitleTranslations
}

export const EducationSection: FC<EducationSectionProperties> = ({
  education,
  translations,
}: EducationSectionProperties): ReactElement => (
  <>
    <Text style={styles.sectionTitle}>{translations.education}</Text>
    <View style={styles.sectionDivider} />
    {education.map(
      (edu: ResumeEducation, index: number): ReactElement => (
        <View
          key={`${edu.institution}-${index.toString()}`}
          style={styles.educationItem}
        >
          <Text style={styles.educationDegree}>{edu.degree}</Text>
          <Text style={styles.educationInstitution}>{edu.institution}</Text>
          <Text style={styles.dateText}>{edu.year}</Text>
        </View>
      )
    )}
  </>
)
