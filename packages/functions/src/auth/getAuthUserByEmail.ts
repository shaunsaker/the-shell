import { firebase } from '@/firebase/admin'

export const getAuthUserByEmail = async (email: string) => {
  const user = await firebase.auth().getUserByEmail(email)

  return user
}
