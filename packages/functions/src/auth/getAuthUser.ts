import { firebase } from '../firebaseAdmin'

export const getAuthUser = async (uid: string) => {
  const user = await firebase.auth().getUser(uid)

  return user
}
