import { FormEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSignInWithPassword } from '@/auth/hooks/useSignInWithPassword'
import { AuthLayout } from '@/components/authLayout/AuthLayout'
import { Button } from '@/components/button/Button'
import { Text } from '@/components/text/Text'
import { TextInput } from '@/components/textInput/TextInput'
import { routes } from '@/router/routes'
import { useUserEmail } from '@/user/hooks/useUserEmail'
import { validateEmail } from '@/utils/validateEmail'

export const SignIn = () => {
  const [email, setEmail] = useUserEmail()
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
    [disabled, email, password, signInWithPassword],
  )

  return (
    <AuthLayout
      title="Sign in to your account"
      footer={
        <Text>
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
      }
    >
      <form className="space-y-6" onSubmit={onSubmit}>
        <TextInput
          type="email"
          label="Email address"
          placeholder="Enter your email..."
          autoComplete="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <TextInput
          label="Password"
          placeholder="Enter your password..."
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <Button
          className="-ml-3.5 block"
          type="button"
          variant="light"
          onClick={() => {
            navigate(routes.forgotPassword)
          }}
        >
          Forgot password?
        </Button>

        <Button type="submit" disabled={disabled} loading={isLoading}>
          Sign in
        </Button>
      </form>
    </AuthLayout>
  )
}
