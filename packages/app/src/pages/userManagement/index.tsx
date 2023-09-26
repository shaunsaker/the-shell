import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { routes } from '../../router/routes'
import { ResetPassword } from './components/resetPassword/ResetPassword'
import { VerifyAndChangeEmail } from './components/verifyAndChangeEmail/VerifyAndChangeEmail'
import { VerifyEmail } from './components/verifyEmail/VerifyEmail'

export const UserManagement = () => {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const navigate = useNavigate()

  useEffect(() => {
    if (!mode) {
      navigate(routes.signIn)
    }
  }, [mode, navigate])

  if (mode === 'verifyEmail') {
    return <VerifyEmail />
  }

  if (mode === 'verifyAndChangeEmail') {
    return <VerifyAndChangeEmail />
  }

  if (mode === 'resetPassword') {
    return <ResetPassword />
  }
}
