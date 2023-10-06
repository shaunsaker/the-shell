import { Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteUser = async (userId: string) => {
  await firebase.firestore().collection(Firestore.Users).doc(userId).delete()
}
