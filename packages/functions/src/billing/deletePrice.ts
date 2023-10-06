import { Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const deletePrice = async (id: string) => {
  await firebase.firestore().collection(Firestore.Prices).doc(id).delete()
}
