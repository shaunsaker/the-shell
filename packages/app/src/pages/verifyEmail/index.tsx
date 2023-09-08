import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { Loading } from '../../components/loading/Loading'
import { routes } from '../../routes'
import { User } from '../../types/firebase'
import { useUpdateUser } from '../../users/hooks/useUpdateUser'
import { useUserFirstName } from '../../users/hooks/useUserFirstName'
import { useUserLastName } from '../../users/hooks/useUserLastName'
import { getISOString } from '../../utils/getISOString'

export default function VerifyEmail() {
  const { data: authUser } = useAuthUser()
  const [userFirstName] = useUserFirstName()
  const [userLastName] = useUserLastName()
  const { mutate: updateUser } = useUpdateUser()
  const navigate = useNavigate()

  useEffect(() => {
    async function createUser() {
      if (!authUser || !authUser.email || !authUser.emailVerified) {
        throw new Error('User is not authenticated')
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

      // navigate to the dashboard
      navigate(routes.dashboard)
    }

    // FIXME: in development, this runs twice
    createUser()
  }, [authUser, navigate, updateUser, userFirstName, userLastName])

  return <Loading />
}
