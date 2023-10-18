import { Customer, Firestore } from 'types'

import { firebase } from '@/firebase/admin'

export const updateCustomers = async (customers: Customer[]) => {
  const batch = firebase.firestore().batch()
  const customersRef = firebase.firestore().collection(Firestore.Customers)

  for (const customer of customers) {
    const customerRef = customersRef.doc(customer.id)

    batch.set(customerRef, customer, { merge: true })
  }

  await batch.commit()
}
