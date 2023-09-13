import { Customer } from 'types'

import { firebase } from '../firebaseAdmin'

export const getCustomer = async (uid: string) => {
  const doc = await firebase.firestore().collection('customers').doc(uid).get()

  return doc.data() as Customer | undefined
}
