import React, { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useResetPassword } from '../../../../auth/hooks/useResetPassword'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../router/routes'

export const ResetPassword = (): ReactElement => {
  const [searchParams] = useSearchParams()
  // FIXME: how can we type these params?
  const actionCode = searchParams.get('oobCode')
  const newPassword = searchParams.get('newPassword')
  const { mutate: resetPassword } = useResetPassword()
  const navigate = useNavigate()

  useEffect(() => {
    async function doAsync() {
      if (
        !actionCode &&
        // in development, we don't have an action code
        // because firebase automatically changes the password when the email action link is clicked
        import.meta.env.MODE !== 'development'
      ) {
        throw new Error('Action code is missing')
      }

      if (!newPassword) {
        throw new Error('New password is missing')
      }

      // in development, we don't have an action code because Firebase automatically changes the password when the email action link is clicked
      if (actionCode) {
        await resetPassword({ actionCode, newPassword })
      }

      toast.success('Password changed successfully. Please sign in to continue.')

      // navigate to the sign in page
      navigate(routes.signIn)
    }

    // FIXME: SS in development, this runs twice
    doAsync()
  }, [actionCode, navigate, newPassword, resetPassword])

  return <Loading />
}
