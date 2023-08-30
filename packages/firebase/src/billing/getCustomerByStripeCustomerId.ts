import { firebase } from '../firebaseAdmin'
import { Customer } from '../models'

export const getCustomerByStripeCustomerId = async (stripeCustomerId: string) => {
  const doc = await firebase.firestore().collection('customers').where('stripeCustomerId', '==', stripeCustomerId).get()

  return doc.docs[0].data() as Customer | undefined
}
