'use client'
import { Button, Text } from '@tremor/react'
import app from 'common/app.json'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'

import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { TextInput } from '../../components/textInput/TextInput'
import { useAuthEmail } from '../../hooks/auth/useAuthEmail'
import { useSignUpWithPassword } from '../../hooks/auth/useSignUpWithPassword'
import { routes } from '../../routes'
import { validateEmail } from '../../utils/validateEmail'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useAuthEmail()
  const [password, setPassword] = useState('')
  const { mutate: signUpWithPassword, isLoading } = useSignUpWithPassword()
  const router = useRouter()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid || !firstName || !lastName

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await signUpWithPassword({
        email,
        password,
        emailRedirectTo: `${location.origin}/auth/callback`,
        firstName,
        lastName,
      })
    },
    [disabled, email, firstName, lastName, password, signUpWithPassword],
  )

  return (
    <AuthLayout
      title={`Sign up to ${app.displayName}`}
      onSubmit={onSubmit}
      footer={
        <Text>
          Already a member?{' '}
          <Button
            variant="light"
            onClick={() => {
              router.push(routes.signIn)
            }}
          >
            Sign in instead
          </Button>
        </Text>
      }
    >
      <div className="mt-2 flex flex-wrap gap-6 lg:flex-nowrap">
        <TextInput
          className="flex-1"
          label="First name"
          placeholder="Enter your first name..."
          required
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />

        <TextInput
          className="flex-1"
          label="Last name"
          placeholder="Enter your last name..."
          required
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </div>

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

      <Button type="submit" disabled={disabled} loading={isLoading}>
        Sign up
      </Button>
    </AuthLayout>
  )
}
