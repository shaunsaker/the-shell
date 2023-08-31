import { firebase } from '../firebaseAdmin'

export const deleteAuthUser = async (userId: string) => {
  await firebase.auth().deleteUser(userId)
}
