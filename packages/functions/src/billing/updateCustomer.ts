import { firebase } from '../firebaseAdmin'
import { Customer } from '../models'

export const updateCustomer = async (uid: string, data: Customer) => {
  await firebase.firestore().collection('customers').doc(uid).set(data, { merge: true })
}
