'use client'
import { Button, Text } from '@tremor/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'

import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { TextInput } from '../../components/textInput/TextInput'
import { useAuthEmail } from '../../hooks/auth/useAuthEmail'
import { useSignInWithPassword } from '../../hooks/auth/useSignInWithPassword'
import { routes } from '../../routes'
import { validateEmail } from '../../utils/validateEmail'

export default function SignIn() {
  const [email, setEmail] = useAuthEmail()
  const [password, setPassword] = useState('')
  const { mutate: signInWithPassword, isLoading } = useSignInWithPassword()
  const router = useRouter()

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
      onSubmit={onSubmit}
      footer={
        <Text>
          Not a member?{' '}
          <Button
            variant="light"
            onClick={() => {
              router.push(routes.signUp)
            }}
          >
            Sign up instead
          </Button>
        </Text>
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
          router.push(routes.forgotPassword)
        }}
      >
        Forgot Password?
      </Button>

      <Button type="submit" disabled={disabled} loading={isLoading}>
        Sign in
      </Button>
    </AuthLayout>
  )
}
