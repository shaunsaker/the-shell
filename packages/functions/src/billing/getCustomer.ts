import { Customer, Firestore } from 'types'

import { firebase } from '../firebaseAdmin'

export const getCustomer = async (uid: string) => {
  const doc = await firebase.firestore().collection(Firestore.Customers).doc(uid).get()

  return doc.data() as Customer | undefined
}
