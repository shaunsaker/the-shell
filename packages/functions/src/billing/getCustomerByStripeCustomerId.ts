import { Customer, Firestore } from 'types'

import { firebase } from '../firebaseAdmin'

export const getCustomerByStripeCustomerId = async (stripeCustomerId: string) => {
  const doc = await firebase
    .firestore()
    .collection(Firestore.Customers)
    .where('stripeCustomerId', '==', stripeCustomerId)
    .get()

  return doc.docs[0].data() as Customer | undefined
}
