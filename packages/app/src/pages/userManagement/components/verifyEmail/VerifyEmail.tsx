import React, { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuthUser } from '../../../../auth/hooks/useAuthUser'
import { useVerifyEmail } from '../../../../auth/hooks/useVerifyEmail'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../routes'

export const VerifyEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const { data: authUser } = useAuthUser()
  const { mutate: verifyEmail } = useVerifyEmail()
  const navigate = useNavigate()

  useEffect(() => {
    async function verifyUser() {
      if (
        !actionCode &&
        // in development, we don't have an action code
        // because firebase automatically verifies the email when the email action link is clicked
        import.meta.env.MODE !== 'development'
      ) {
        throw new Error('Action code is missing')
      }

      // in development, we don't have an action code because Firebase automatically verifies the email when the email action link is clicked
      if (actionCode) {
        await verifyEmail(actionCode)
      }

      // navigate to the sign in page
      navigate(routes.signIn)

      toast.success('Email verified successfully. Please sign in to continue.')
    }

    // FIXME: SS in development, this runs twice
    verifyUser()
  }, [actionCode, authUser, navigate, verifyEmail])

  return <Loading />
}
