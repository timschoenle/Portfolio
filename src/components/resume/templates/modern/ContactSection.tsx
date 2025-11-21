import { type FC, type ReactElement } from 'react'

import { Link, Text, View } from '@react-pdf/renderer'

import type {
  ResumeData,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

import { styles } from './modern.styles'

interface ContactSectionProperties {
  readonly personalInfo: ResumeData['personalInfo']
  readonly translations: ResumeSectionTitleTranslations
}

export const ContactSection: FC<ContactSectionProperties> = ({
  personalInfo,
  translations,
}: ContactSectionProperties): ReactElement | null => {
  if (personalInfo === undefined) {
    return null
  }

  return (
    <>
      <Text style={styles.sectionTitleFirst}>{translations.contact}</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.contactLabel}>{translations.email}</Text>
      <Text style={styles.contactItem}>{personalInfo.email}</Text>

      <Text style={styles.contactLabel}>{translations.location}</Text>
      <Text style={styles.contactItem}>{personalInfo.location}</Text>

      <Text style={styles.contactLabel}>{translations.github}</Text>
      <Link src={personalInfo.github} style={styles.contactItem}>
        {personalInfo.github.replace('https://', '')}
      </Link>

      {personalInfo.linkedin === undefined ? null : (
        <>
          <Text style={styles.contactLabel}>{translations.linkedin}</Text>
          <Link src={personalInfo.linkedin} style={styles.contactItem}>
            {personalInfo.linkedin.replace('https://', '')}
          </Link>
        </>
      )}
    </>
  )
}
