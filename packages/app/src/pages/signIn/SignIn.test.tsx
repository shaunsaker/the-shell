import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MockAppProvider } from '../../test/MockAppProvider'
import { SignIn } from '.'

const getEmailInput = () => screen.getByLabelText('Email address')
const getPasswordInput = () => screen.getByLabelText('Password')
const getSignInButton = () => screen.getByRole('button', { name: 'Sign in' })

const fillForm = ({ email, password }: { email?: string; password?: string }) => {
  fireEvent.change(getEmailInput(), { target: { value: email } })
  fireEvent.change(getPasswordInput(), { target: { value: password } })
}

const signInWithPasswordMock = vi.fn()

vi.mock('../../auth/hooks/useSignInWithPassword', () => ({
  useSignInWithPassword: vi.fn(() => ({
    mutate: signInWithPasswordMock,
  })),
}))

describe('SignIn', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(getEmailInput()).toBeInTheDocument()
    expect(getPasswordInput()).toBeInTheDocument()
    expect(getSignInButton()).toBeInTheDocument()
  })

  it('disables the form when are no input values', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    expect(getSignInButton()).toBeDisabled()
  })

  it('disables the form when there is no email', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: '',
      password: '123123',
    })

    expect(getSignInButton()).toBeDisabled()
  })

  it('disables the form when there the email is invalid', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail',
      password: '123123',
    })

    expect(getSignInButton()).toBeDisabled()
  })

  it('disables the form when there is no password', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '',
    })

    expect(getSignInButton()).toBeDisabled()
  })

  it('enabled the form when are valid input values', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSignInButton()).toBeEnabled()
  })

  it('signs in users', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    fireEvent.submit(getSignInButton())

    expect(signInWithPasswordMock).toHaveBeenCalled()
  })
})
