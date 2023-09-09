import React, { ReactElement, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuthUser } from '../../../../auth/hooks/useAuthUser'
import { useSignOut } from '../../../../auth/hooks/useSignOut'
import { useVerifyEmail } from '../../../../auth/hooks/useVerifyEmail'
import { Loading } from '../../../../components/loading/Loading'
import { routes } from '../../../../routes'
import { User } from '../../../../types/firebase'
import { useUpdateUser } from '../../../../users/hooks/useUpdateUser'
import { useUserFirstName } from '../../../../users/hooks/useUserFirstName'
import { useUserLastName } from '../../../../users/hooks/useUserLastName'
import { getISOString } from '../../../../utils/getISOString'

// FIXME: SS why does this load twice?
export const VerifyEmail = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const actionCode = searchParams.get('oobCode')
  const { data: authUser } = useAuthUser()
  const [userFirstName] = useUserFirstName()
  const [userLastName] = useUserLastName()
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: verifyEmail } = useVerifyEmail()
  const { mutate: signOut } = useSignOut()
  const navigate = useNavigate()

  useEffect(() => {
    async function createUser() {
      if (!authUser || !authUser.email) {
        throw new Error('User is not authenticated')
      }

      if (
        !actionCode &&
        // in development, we don't have an action code
        // because firebase automatically verifies the email when the email action link is clicked
        import.meta.env.MODE !== 'development'
      ) {
        throw new Error('Action code is missing')
      }

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

      // in development, we don't have an action code
      if (actionCode) {
        await verifyEmail(actionCode)
      }

      // in development, firebase does not refresh the auth user after verifying the email
      // so we need to manually handle the navigation
      if (import.meta.env.MODE === 'development') {
        navigate(routes.dashboard)
      } else {
        // sign out the user
        await signOut()

        // navigate to the sign in page
        navigate(routes.signIn)
      }
    }

    // FIXME: SS in development, this runs twice
    createUser()
  }, [actionCode, authUser, navigate, updateUser, userFirstName, userLastName, verifyEmail, signOut])

  return <Loading />
}
