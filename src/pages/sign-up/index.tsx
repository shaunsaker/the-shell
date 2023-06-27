import { Button, Card, Metric, Text, TextInput } from '@tremor/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import pkg from '../../../package.json'
import { FullPage } from '../../components/fullPage/FullPage'
import { Logo } from '../../components/logo/Logo'
import { routes } from '../../routes'
import { supabase } from '../../services/supabase'
import { useAuthEmail } from '../../store/user/useAuthEmail'
import { validateEmail } from '../../utils/validateEmail'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useAuthEmail()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid || !firstName || !lastName

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      setLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.href,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('A confirmation email has been sent to your inbox.')
      }

      setLoading(false)
    },
    [disabled, email, firstName, lastName, password]
  )

  return (
    <FullPage>
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">Sign up to {pkg.app.displayName}</Metric>
      </div>

      <Card className="mt-10 w-full max-w-lg">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-wrap gap-6 lg:flex-nowrap">
            <div className="flex-1">
              <Text>First Name</Text>

              <TextInput
                className="mt-2"
                placeholder="Enter your first name..."
                required
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </div>

            <div className="flex-1">
              <Text>Last Name</Text>

              <TextInput
                className="mt-2"
                placeholder="Enter your last name..."
                required
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div>
            <Text>Email address</Text>

            <TextInput
              className="mt-2"
              placeholder="Enter your email..."
              autoComplete="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              // @ts-expect-error override tremor type
              type="email"
            />
          </div>

          <div>
            <Text>Password</Text>

            <TextInput
              className="mt-2"
              placeholder="Enter your password..."
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <Button type="submit" disabled={disabled} loading={loading}>
            Sign up
          </Button>
        </form>
      </Card>

      <Text className="mt-10 text-center">
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
    </FullPage>
  )
}
