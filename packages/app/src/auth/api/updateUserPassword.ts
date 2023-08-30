import { updatePassword } from 'firebase/auth'

import { getAuthUser } from './getAuthUser'

export const updateUserPassword = async (password: string) => {
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error('No auth user found.')
  }

  await updatePassword(authUser, password)
}
