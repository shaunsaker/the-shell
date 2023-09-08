import React, { ReactElement, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { verifyEmail } from '../../../../auth/api/verifyEmail'
import { useAuthUser } from '../../../../auth/hooks/useAuthUser'
import { Alert } from '../../../../components/alert/Alert'
import { AuthLayout } from '../../../../components/authLayout/AuthLayout'
import { Button } from '../../../../components/button/Button'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../routes'
import { User } from '../../../../types/firebase'
import { useUpdateUser } from '../../../../users/hooks/useUpdateUser'
import { useUserFirstName } from '../../../../users/hooks/useUserFirstName'
import { useUserLastName } from '../../../../users/hooks/useUserLastName'
import { getISOString } from '../../../../utils/getISOString'

export const VerifyEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const { data: authUser } = useAuthUser()
  const [userFirstName] = useUserFirstName()
  const [userLastName] = useUserLastName()
  const { mutate: updateUser, isLoading } = useUpdateUser()
  const navigate = useNavigate()

  useEffect(() => {
    async function createUser() {
      if (!authUser || !authUser.email) {
        throw new Error('User is not authenticated')
      }

      if (!actionCode) {
        throw new Error('Action code is missing')
      }

      await verifyEmail(actionCode)

      // create the user in the database
      const uid = authUser.uid
      const user: User = {
        id: uid,
        createdAt: getISOString(),
        email: authUser.email,
        firstName: userFirstName,
        lastName: userLastName,
      }

      await updateUser(user)
    }

    // FIXME: in development, this runs twice
    createUser()
  }, [actionCode, authUser, navigate, updateUser, userFirstName, userLastName])

  if (isLoading) {
    return <Loading />
  }

  return (
    <AuthLayout title="Verify email">
      <Alert>Your email has been verified and you can now sign in.</Alert>

      <Button
        onClick={() => {
          navigate(routes.signIn)
        }}
      >
        Go to Sign in
      </Button>
    </AuthLayout>
  )
}
