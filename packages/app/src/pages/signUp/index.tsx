import { FormEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import app from '../../../../common/app.json'
import { useSignUpWithPassword } from '../../auth/hooks/useSignUpWithPassword'
import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { Button } from '../../components/button/Button'
import { Text } from '../../components/text/Text'
import { TextInput } from '../../components/textInput/TextInput'
import { routes } from '../../router/routes'
import { useUserEmail } from '../../user/hooks/useUserEmail'
import { validateEmail } from '../../utils/validateEmail'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useUserEmail()
  const [password, setPassword] = useState('')
  const { mutate: signUpWithPassword, isLoading } = useSignUpWithPassword()
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid || !firstName || !lastName

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await signUpWithPassword({
        firstName,
        lastName,
        email,
        password,
      })
    },
    [disabled, email, firstName, lastName, password, signUpWithPassword],
  )

  return (
    <AuthLayout
      title={`Sign up to ${app.displayName}`}
      footer={
        <Text>
          Already a member?{' '}
          <Button
            variant="light"
            onClick={() => {
              navigate(routes.signIn)
            }}
          >
            Sign in instead
          </Button>
        </Text>
      }
    >
      <form className="space-y-6" onSubmit={onSubmit}>
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

        <Button type="submit" disabled={disabled} loading={isLoading}>
          Sign up
        </Button>
      </form>
    </AuthLayout>
  )
}
