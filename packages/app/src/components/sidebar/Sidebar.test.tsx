import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { NavigationItem } from '../../types'
import { Sidebar } from './Sidebar'

const ITEMS: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    active: true,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    active: false,
    disabled: true,
  },
  {
    name: 'Settings',
    href: '/settings',
    active: false,
  },
]

const onClick = vi.fn()

describe('Sidebar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(<Sidebar items={ITEMS} onClick={onClick} />)

    expect(screen.getByRole('button', { name: ITEMS[0].name })).toBeInTheDocument()
  })

  it('disables the button if the item is disabled', () => {
    render(<Sidebar items={ITEMS} onClick={onClick} />)

    expect(screen.getByRole('button', { name: ITEMS[1].name })).toBeDisabled()
  })

  it('allows click if the item is not disabled and the route is not active', () => {
    render(<Sidebar items={ITEMS} onClick={onClick} />)

    const button = screen.getByRole('button', { name: ITEMS[2].name })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledWith(ITEMS[2].href)
  })
})
