import { Customer, Firestore } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateCustomer = async (uid: string, data: Customer) => {
  await firebase.firestore().collection(Firestore.Customers).doc(uid).set(data, { merge: true })
}
