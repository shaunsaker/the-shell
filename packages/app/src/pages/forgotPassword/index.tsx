import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { FormEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthEmail } from '../../auth/hooks/useAuthEmail'
import { useResetPasswordForEmail } from '../../auth/hooks/useResetPasswordForEmail'
import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { Button } from '../../components/button/Button'
import { TextInput } from '../../components/textInput/TextInput'
import { routes } from '../../routes'
import { validateEmail } from '../../utils/validateEmail'

export default function ForgotPassword() {
  const [email, setEmail] = useAuthEmail()
  const navigate = useNavigate()
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
        redirectTo: `${window.location.origin}${routes.settingsResetPassword}`,
      })
    },
    [disabled, email, resetPasswordForEmail],
  )

  return (
    <AuthLayout
      title="Forgot your password?"
      footer={
        <Button
          icon={ArrowLeftIcon}
          variant="light"
          onClick={() => {
            navigate(routes.signIn)
          }}
        >
          Back to sign in
        </Button>
      }
    >
      <form className="space-y-6" onSubmit={onSubmit}>
        <TextInput
          className="mt-2"
          type="email"
          label="Email address"
          placeholder="Enter your email..."
          autoComplete="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Button type="submit" disabled={disabled} loading={isLoading}>
          Send password reset email
        </Button>
      </form>
    </AuthLayout>
  )
}
