import { Customer, Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const updateCustomer = async (data: Customer) => {
  await firebase.firestore().collection(Firestore.Customers).doc(data.id).set(data, { merge: true })
}
