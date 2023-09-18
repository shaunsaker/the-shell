import { collection, getDocs, query, where } from 'firebase/firestore'
import { Product } from 'types'

import { db } from '../../firebase'

// fetch the active products
export const getProducts = async () => {
  const ref = collection(db, 'products')
  const queryRef = query(ref, where('active', '==', true))

  const products = await getDocs(queryRef)

  return products.docs.map(product => ({
    id: product.id,
    ...product.data(),
  })) as Product[]
}
