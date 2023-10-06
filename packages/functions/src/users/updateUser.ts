import { Firestore, User } from 'types'

import { firebase } from '@/firebase/admin'

export const updateUser = async (uid: string, data: Partial<User>) => {
  await firebase.firestore().collection(Firestore.Users).doc(uid).set(data, { merge: true })
}
