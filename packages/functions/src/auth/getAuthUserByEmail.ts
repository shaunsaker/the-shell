import { firebase } from '../firebaseAdmin'

export const getAuthUserByEmail = async (email: string) => {
  const user = await firebase.auth().getUserByEmail(email)

  return user
}
