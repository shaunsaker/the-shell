import { Firestore } from 'types'

import { firebase } from '../firebaseAdmin'

export const deletePrice = async (id: string) => {
  await firebase.firestore().collection(Firestore.Prices).doc(id).delete()
}
