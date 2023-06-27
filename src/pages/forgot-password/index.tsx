import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button, Card, Metric, Text, TextInput } from '@tremor/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { FullPage } from '../../components/fullPage/FullPage'
import { Logo } from '../../components/logo/Logo'
import { routes } from '../../routes'
import { supabase } from '../../services/supabase'
import { useAuthEmail } from '../../store/user/useAuthEmail'
import { validateEmail } from '../../utils/validateEmail'

export default function ForgotPassword() {
  const [email, setEmail] = useAuthEmail()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !isEmailValid

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      setLoading(true)

      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Password reset email sent')
      }

      setLoading(false)
    },
    [disabled, email]
  )

  return (
    <FullPage>
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">Forgot your password?</Metric>
      </div>

      <Card className="mx-4 mt-10 w-full max-w-lg">
        <form className="space-y-6" onSubmit={onSubmit}>
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

          <Button type="submit" disabled={disabled} loading={loading}>
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
