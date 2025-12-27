import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  // ... (other tests)

  it('handles user input', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input).toHaveValue('Hello World')
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('merges custom className', () => {
    render(<Input className="custom-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })
})
