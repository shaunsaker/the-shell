import { updatePassword } from 'firebase/auth'

import { getAuthUser } from './getAuthUser'
import { signInWithPassword } from './signInWithPassword'

export const changeUserPassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string
  newPassword: string
}) => {
  // we first need to reauthenticate the user
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error('No user is currently signed in.')
  }

  if (!authUser.email) {
    throw new Error('The current user does not have an email address.')
  }

  const userCredential = await signInWithPassword({ email: authUser?.email, password: currentPassword })

  await updatePassword(userCredential.user, newPassword)
}
