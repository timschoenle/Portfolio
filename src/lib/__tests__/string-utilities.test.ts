import { describe, expect, it } from 'vitest'

import { stripHtmlTags } from '@/lib/string-utilities'

describe('stripHtmlTags', () => {
  it('removes simple HTML tags', () => {
    expect(stripHtmlTags('<highlight>Java</highlight>')).toBe('Java')
  })

  it('removes tags with attributes', () => {
    expect(stripHtmlTags('<span class="bold">Text</span>')).toBe('Text')
  })

  it('removes nested tags', () => {
    expect(stripHtmlTags('<div><p>Content</p></div>')).toBe('Content')
  })

  it('handles strings without tags', () => {
    expect(stripHtmlTags('Just text')).toBe('Just text')
  })

  it('handles empty strings', () => {
    expect(stripHtmlTags('')).toBe('')
  })

  it('handles self-closing tags', () => {
    expect(stripHtmlTags('Line<br/>Break')).toBe('LineBreak')
  })
})
