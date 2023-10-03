import React, { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useChangeUserEmail } from '../../../../auth/hooks/useChangeUserEmail'
import { useVerifyEmail } from '../../../../auth/hooks/useVerifyEmail'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../router/routes'
import { UserManagementParams } from '../../../../types'

export const VerifyAndChangeEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const actionCode = searchParams.get(UserManagementParams.ActionCode)
  const oldEmail = searchParams.get(UserManagementParams.OldEmail)
  const newEmail = searchParams.get(UserManagementParams.NewEmail)
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

    // NOTE: in development, this runs twice because React.StrictMode mounts the app twice
    doAsync()
  }, [actionCode, changeUserEmail, navigate, oldEmail, verifyEmail, newEmail])

  return <Loading />
}
