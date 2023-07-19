import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button, Card, Metric } from '@tremor/react'
import { FormEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { FullPage } from '../../components/fullPage/FullPage'
import { Logo } from '../../components/logo/Logo'
import { TextInput } from '../../components/textInput/TextInput'
import { useAuthEmail } from '../../hooks/auth/useAuthEmail'
import { useResetPasswordForEmail } from '../../hooks/auth/useResetPasswordForEmail'
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
    [disabled, email, resetPasswordForEmail]
  )

  return (
    <FullPage>
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">Forgot your password?</Metric>
      </div>

      <Card className="mx-4 mt-10 w-full max-w-lg">
        <form className="space-y-6" onSubmit={onSubmit}>
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
        </form>
      </Card>

      <Button
        className="mt-10"
        icon={ArrowLeftIcon}
        variant="light"
        onClick={() => {
          navigate(routes.signIn)
        }}
      >
        Back to sign in
      </Button>
    </FullPage>
  )
}
