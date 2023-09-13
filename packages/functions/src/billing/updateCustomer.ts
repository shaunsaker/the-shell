import { Customer } from 'types'

import { firebase } from '../firebaseAdmin'

export const updateCustomer = async (uid: string, data: Customer) => {
  await firebase.firestore().collection('customers').doc(uid).set(data, { merge: true })
}
