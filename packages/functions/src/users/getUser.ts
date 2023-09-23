import { User } from 'types'

import { firebase } from '../firebaseAdmin'

export const getUser = async (uid: string) => {
  const doc = await firebase.firestore().collection('users').doc(uid).get()

  return {
    id: doc.id,
    ...doc.data(),
  } as User | undefined
}
