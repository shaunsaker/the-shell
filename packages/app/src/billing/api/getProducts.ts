import { collection, getDocs, query, where } from 'firebase/firestore'
import { Firestore, Product } from 'types'

import { db } from '../../firebase'

// fetch the active products
export const getProducts = async () => {
  const ref = collection(db, Firestore.Products)
  const queryRef = query(ref, where('active', '==', true))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(product => ({
    id: product.id,
    ...product.data(),
  })) as Product[]
}
