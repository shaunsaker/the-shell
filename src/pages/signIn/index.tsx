import { Button, Card, Metric, Text } from '@tremor/react'
import { FormEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FullPage } from '../../components/fullPage/FullPage'
import { Logo } from '../../components/logo/Logo'
import { TextInput } from '../../components/textInput/TextInput'
import { useAuthEmail } from '../../hooks/auth/useAuthEmail'
import { useSignInWithPassword } from '../../hooks/auth/useSignInWithPassword'
import { routes } from '../../routes'
import { validateEmail } from '../../utils/validateEmail'

export default function SignIn() {
  const [email, setEmail] = useAuthEmail()
  const [password, setPassword] = useState('')
  const { mutate: signInWithPassword, isLoading } = useSignInWithPassword()
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await signInWithPassword({ email, password })
    },
    [disabled, email, password, signInWithPassword]
  )

  return (
    <FullPage>
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">Sign in to your account</Metric>
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

          <TextInput
            className="mt-2"
            label="Password"
            placeholder="Enter your password..."
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Button
            className="block"
            type="button"
            variant="light"
            onClick={() => {
              navigate(routes.forgotPassword)
            }}
          >
            Forgot Password?
          </Button>

          <Button type="submit" disabled={disabled} loading={isLoading}>
            Sign in
          </Button>
        </form>
      </Card>

      <Text className="mt-10 text-center">
        Not a member?{' '}
        <Button
          variant="light"
          onClick={() => {
            navigate(routes.signUp)
          }}
        >
          Sign up instead
        </Button>
      </Text>
    </FullPage>
  )
}
