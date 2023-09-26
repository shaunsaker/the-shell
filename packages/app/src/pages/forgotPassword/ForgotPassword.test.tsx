import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { routes } from '../../router/routes'
import { MockAppProvider } from '../../test/MockAppProvider'
import { ForgotPassword } from '.'

const getNavigateToSignInButton = () => screen.getByRole('button', { name: 'Back to sign in' })

vi.mock(
  '../../components/resetPassword/ResetPassword',
  vi.fn(() => ({
    ResetPassword: vi.fn(),
  })),
)

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe('ForgotPassword', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders', () => {
    render(
      <MockAppProvider>
        <ForgotPassword />
      </MockAppProvider>,
    )

    expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
    expect(getNavigateToSignInButton()).toBeInTheDocument()
  })

  it('navigates back to sign in', () => {
    render(
      <MockAppProvider>
        <ForgotPassword />
      </MockAppProvider>,
    )

    getNavigateToSignInButton().click()

    expect(navigateMock).toHaveBeenCalledWith(routes.signIn)
  })
})
