import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { routes } from '../../routes'
import { VerifyEmail } from './components/verifyEmail/VerifyEmail'

export default function UserManagement() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const navigate = useNavigate()

  useEffect(() => {
    if (!mode) {
      console.log('Redirecting to sign in')
      navigate(routes.signIn)
    }
  }, [mode, navigate])

  if (mode === 'verifyEmail') {
    return <VerifyEmail />
  }

  // TODO: SS add the other modes
}
