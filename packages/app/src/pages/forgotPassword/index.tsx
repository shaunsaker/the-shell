import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components/authLayout/AuthLayout'
import { Button } from '../../components/button/Button'
import { ResetPassword } from '../../components/resetPassword/ResetPassword'
import { routes } from '../../routes'

export default function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Forgot your password?"
      footer={
        <Button
          icon={<ArrowLeftIcon />}
          variant="light"
          onClick={() => {
            navigate(routes.signIn)
          }}
        >
          Back to sign in
        </Button>
      }
    >
      <ResetPassword />
    </AuthLayout>
  )
}
