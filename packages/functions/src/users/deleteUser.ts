import { firebase } from '../firebaseAdmin'

export const deleteUser = async (userId: string) => {
  await firebase.firestore().collection('users').doc(userId).delete()
}
