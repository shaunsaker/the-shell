import React, { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useChangeUserEmail } from '../../../../auth/hooks/useChangeUserEmail'
import { useVerifyEmail } from '../../../../auth/hooks/useVerifyEmail'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../routes'

export const VerifyAndChangeEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  // FIXME: how can we type these params?
  const actionCode = searchParams.get('oobCode')
  const oldEmail = searchParams.get('oldEmail')
  const newEmail = searchParams.get('newEmail')
  const { mutate: verifyEmail } = useVerifyEmail()
  const { mutate: changeUserEmail } = useChangeUserEmail()
  const navigate = useNavigate()

  useEffect(() => {
    async function doAsync() {
      if (!actionCode) {
        throw new Error('Action code is missing')
      }

      if (!oldEmail) {
        throw new Error('Old email is required')
      }

      if (!newEmail) {
        throw new Error('New email is required')
      }

      await verifyEmail(actionCode)

      // we need to call a function on the backend to update the auth user's email now that it's been verified
      await changeUserEmail({
        oldEmail,
        newEmail,
      })

      toast.success('Your email has been changed successfully. Please sign in to continue.')

      // navigate to the sign in page
      navigate(routes.signIn)
    }

    // FIXME: SS in development, this runs twice
    doAsync()
  }, [actionCode, changeUserEmail, navigate, oldEmail, verifyEmail, newEmail])

  return <Loading />
}
