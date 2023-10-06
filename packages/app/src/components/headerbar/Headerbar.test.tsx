import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { Headerbar } from './Headerbar'

const mocks = vi.hoisted(() => ({
  setSidebarOpen: vi.fn(),
}))

vi.mock('../../sidebar/hooks/useSidebarOpen', () => ({
  useSidebarOpen: () => [false, mocks.setSidebarOpen],
}))

const getSidebarButton = () => screen.getByRole('button')

describe('Headerbar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(<Headerbar />)

    expect(getSidebarButton()).toBeInTheDocument()
  })

  it('opens the sidebar on button click', () => {
    render(<Headerbar />)

    const sidebarButton = getSidebarButton()
    expect(sidebarButton).toBeInTheDocument()

    fireEvent.click(sidebarButton)

    expect(mocks.setSidebarOpen).toHaveBeenCalled()
  })
})
