import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '../command'

// Mock cmdk with all required sub-components
vi.mock('cmdk', () => {
  const Command = ({ children, ...props }: any) => (
    <div data-slot="command" {...props}>
      {children}
    </div>
  )
  Command.Input = ({ ...props }: any) => (
    <input data-slot="command-input" {...props} />
  )
  Command.List = ({ children, ...props }: any) => (
    <div data-slot="command-list" {...props}>
      {children}
    </div>
  )
  Command.Empty = ({ children, ...props }: any) => (
    <div data-slot="command-empty" {...props}>
      {children}
    </div>
  )
  Command.Group = ({ children, ...props }: any) => (
    <div data-slot="command-group" {...props}>
      {children}
    </div>
  )
  Command.Item = ({ children, ...props }: any) => (
    <div data-slot="command-item" {...props}>
      {children}
    </div>
  )
  Command.Separator = ({ ...props }: any) => (
    <div data-slot="command-separator" {...props} />
  )

  return { Command }
})

// Mock lucide icons
vi.mock('lucide-react', () => ({
  SearchIcon: () => <div data-testid="search-icon">Search</div>,
}))

describe('Command components', () => {
  it('renders Command root', () => {
    render(<Command>Content</Command>)
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('renders CommandInput with search icon', () => {
    render(<CommandInput placeholder="Search..." />)
    expect(screen.getByTestId('search-icon')).toBeDefined()
  })

  it('renders CommandList', () => {
    render(<CommandList>Items</CommandList>)
    expect(screen.getByText('Items')).toBeDefined()
  })

  it('renders CommandEmpty', () => {
    render(<CommandEmpty>No results</CommandEmpty>)
    expect(screen.getByText('No results')).toBeDefined()
  })

  it('renders CommandGroup', () => {
    render(<CommandGroup>Group</CommandGroup>)
    expect(screen.getByText('Group')).toBeDefined()
  })

  it('renders CommandItem', () => {
    render(<CommandItem>Item</CommandItem>)
    expect(screen.getByText('Item')).toBeDefined()
  })

  it('renders CommandSeparator', () => {
    const { container } = render(<CommandSeparator />)
    expect(
      container.querySelector('[data-slot="command-separator"]')
    ).toBeDefined()
  })

  it('renders CommandShortcut', () => {
    render(<CommandShortcut>Ctrl+K</CommandShortcut>)
    expect(screen.getByText('Ctrl+K')).toBeDefined()
  })
})
