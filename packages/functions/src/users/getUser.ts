import { Firestore, User } from 'types'

import { firebase } from '../firebaseAdmin'

export const getUser = async (uid: string) => {
  const doc = await firebase.firestore().collection(Firestore.Users).doc(uid).get()

  return {
    id: doc.id,
    ...doc.data(),
  } as User | undefined
}
