'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback } from 'react'

import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { TextInput } from '../../components/textInput/TextInput'
import { useAuthEmail } from '../../hooks/auth/useAuthEmail'
import { useResetPasswordForEmail } from '../../hooks/auth/useResetPasswordForEmail'
import { routes } from '../../routes'
import { validateEmail } from '../../utils/validateEmail'

export default function ForgotPassword() {
  const [email, setEmail] = useAuthEmail()
  const router = useRouter()
  const { mutate: resetPasswordForEmail, isLoading } = useResetPasswordForEmail()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !isEmailValid

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await resetPasswordForEmail({
        email,
        redirectTo: `${location.origin}${routes.settingsResetPassword}`,
      })
    },
    [disabled, email, resetPasswordForEmail],
  )

  return (
    <AuthLayout
      title="Forgot your password?"
      onSubmit={onSubmit}
      footer={
        <Button
          icon={ArrowLeftIcon}
          variant="light"
          onClick={() => {
            router.push(routes.signIn)
          }}
        >
          Back to sign in
        </Button>
      }
    >
      <TextInput
        className="mt-2"
        label="Email address"
        placeholder="Enter your email..."
        autoComplete="email"
        required
        value={email}
        onChange={event => setEmail(event.target.value)}
        // @ts-expect-error override tremor type
        type="email"
      />

      <Button type="submit" disabled={disabled} loading={isLoading}>
        Send password reset email
      </Button>
    </AuthLayout>
  )
}
