import { updateEmail } from 'firebase/auth'

import { updateUser } from '../../users/api/updateUser'
import { getAuthUser } from './getAuthUser'
import { signInWithPassword } from './signInWithPassword'

export const changeUserEmail = async ({ newEmail, password }: { newEmail: string; password: string }) => {
  // we first need to reauthenticate the user
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error('No user is currently signed in.')
  }

  if (!authUser.email) {
    throw new Error('The current user does not have an email address.')
  }

  const userCredential = await signInWithPassword({ email: authUser?.email, password })

  await updateEmail(userCredential.user, newEmail)

  const uid = userCredential.user.uid

  await updateUser({ id: uid, email: newEmail })

  return {
    uid,
    email: newEmail,
  }
}
