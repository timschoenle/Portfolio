import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'

import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('text-sm', 'font-medium')
  })

  it('renders as a standard label element', () => {
    render(<Label htmlFor="input-id">Label for Input</Label>)
    const label = screen.getByText('Label for Input')
    // Access the DOM element directly through the Testing Library query result
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'input-id')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('merges custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>)
    const label = screen.getByText('Custom Label')
    expect(label).toHaveClass('custom-label')
  })
})
