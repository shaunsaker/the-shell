import { Customer, Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const getCustomer = async (id: string) => {
  const doc = await firebase.firestore().collection(Firestore.Customers).doc(id).get()

  if (!doc.exists) {
    return undefined
  }

  return {
    id: doc.id,
    ...doc.data(),
  } as Customer | undefined
}
