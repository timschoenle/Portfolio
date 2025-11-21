/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable security/detect-non-literal-fs-filename */
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

import React from 'react'

import { createTranslator, type Messages } from 'next-intl'

import { renderToBuffer } from '@react-pdf/renderer'

import { ResumePDFDocument } from '@/components/resume/resume-pdf-document'
import {
  getResumeSummary,
  resumeEducation,
  resumeExperience,
  resumeProjects,
  resumeSkills,
} from '@/data/resume'
import { siteConfig } from '@/lib/config'
import type { Translations } from '@/types/i18n'
import type {
  ResumeData,
  ResumePersonalInfo,
  ResumeSectionTitleTranslations,
} from '@/types/resume-types'

type Locale = 'de' | 'en'

const LOCALES: readonly Locale[] = ['en', 'de']

// Main execution wrapped in async IIFE to support CJS output format
void (async (): Promise<void> => {
  const publicDirectory: string = path.join(process.cwd(), 'public', 'resume')

  // Delete existing directory to ensure clean slate
  try {
    await rm(publicDirectory, { force: true, recursive: true })
    console.log('✓ Cleaned resume directory')
  } catch {
    // Directory doesn't exist, that's fine
  }

  // Create fresh directory
  await mkdir(publicDirectory, { recursive: true })

  // Build personal info from siteConfig
  const personalInfo: ResumePersonalInfo = {
    email: siteConfig.email,
    github: siteConfig.github,
    location: siteConfig.location,
    name: siteConfig.fullName,
    title: siteConfig.jobTitle,
  }

  for (const locale of LOCALES) {
    console.log(`Generating resume for locale: ${locale}`)

    // Load messages for the locale
    const messages: Messages =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,unicorn/no-await-expression-member
      (await import(`../messages/${locale}.json`)).default as Messages

    const translations: Translations<''> = createTranslator({
      locale,
      messages,
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const sectionTitles: ResumeSectionTitleTranslations = translations.raw(
      'contact.sectionTitles'
    )

    // Build complete resume data
    const resumeData: ResumeData = {
      education: resumeEducation,
      experience: resumeExperience,
      personalInfo,
      projects: resumeProjects,
      skills: resumeSkills,
      summary: getResumeSummary(locale),
    }

    const element: React.ReactElement = React.createElement(ResumePDFDocument, {
      data: resumeData,
      translations: sectionTitles,
    })

    // @ts-expect-error - React PDF type mismatch
    const buffer: Buffer = await renderToBuffer(element)

    const filename: string = `resume-${locale}.pdf`
    await writeFile(path.join(publicDirectory, filename), buffer)

    console.log(`✓ Generated ${filename}`)
  }

  console.log('Resume generation complete!')
})()
