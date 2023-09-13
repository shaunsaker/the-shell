import { Customer } from 'types'

import { firebase } from '../firebaseAdmin'

export const getCustomerByStripeCustomerId = async (stripeCustomerId: string) => {
  const doc = await firebase.firestore().collection('customers').where('stripeCustomerId', '==', stripeCustomerId).get()

  return doc.docs[0].data() as Customer | undefined
}
