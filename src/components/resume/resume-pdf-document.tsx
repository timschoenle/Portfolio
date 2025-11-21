import { type ReactElement } from 'react'

import { Document } from '@react-pdf/renderer'

import { ModernTemplate } from '@/components/resume/templates/modern'
import type {
  ResumeData,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

interface ResumePDFDocumentProperties {
  readonly data: ResumeData
  readonly translations: ResumeSectionTitleTranslations
}

// eslint-disable-next-line @typescript-eslint/typedef
export const ResumePDFDocument = ({
  data,
  translations,
}: ResumePDFDocumentProperties): ReactElement => {
  return (
    <Document>
      <ModernTemplate data={data} translations={translations} />
    </Document>
  )
}
