import React, { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuthUser } from '../../../../auth/hooks/useAuthUser'
import { useVerifyEmail } from '../../../../auth/hooks/useVerifyEmail'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../routes'

export const VerifyEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  // FIXME: how can we type these params?
  const actionCode = searchParams.get('oobCode')
  const oldEmail = searchParams.get('oldEmail')
  const email = searchParams.get('email')
  const { data: authUser } = useAuthUser()
  const { mutate: verifyEmail } = useVerifyEmail()
  const navigate = useNavigate()

  useEffect(() => {
    async function doAsync() {
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

      toast.success('Email verified successfully. Please sign in to continue.')

      // navigate to the sign in page
      navigate(routes.signIn)
    }

    // FIXME: SS in development, this runs twice
    doAsync()
  }, [actionCode, authUser, navigate, email, oldEmail, verifyEmail])

  return <Loading />
}