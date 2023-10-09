import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { Headerbar } from './Headerbar'

const getSidebarButton = () => screen.getByRole('button')

describe('Headerbar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(<Headerbar />)

    expect(getSidebarButton()).toBeInTheDocument()
  })

  it('opens the sidebar on button click', () => {
    const onOpenSidebar = vi.fn()

    render(<Headerbar onOpenSidebar={onOpenSidebar} />)

    const sidebarButton = getSidebarButton()
    expect(sidebarButton).toBeInTheDocument()

    fireEvent.click(sidebarButton)

    expect(onOpenSidebar).toHaveBeenCalled()
  })
})
