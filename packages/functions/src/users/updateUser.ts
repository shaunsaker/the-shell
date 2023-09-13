import { User } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateUser = async (uid: string, data: Partial<User>) => {
  await firebase.firestore().collection('users').doc(uid).set(data, { merge: true })
}
