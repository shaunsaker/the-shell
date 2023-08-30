import { firebase } from '../firebaseAdmin'
import { User } from '../models'

export const updateUser = async (uid: string, data: Partial<User>) => {
  await firebase.firestore().collection('users').doc(uid).set(data, { merge: true })
}
