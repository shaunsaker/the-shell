import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../../firebase'
import { Product } from '../../types/firebase'

// fetch the active products
export const getProducts = async () => {
  const products = await getDocs(query(collection(db, 'products'), where('active', '==', true)))

  return products.docs.map(product => ({
    id: product.id,
    ...product.data(),
  })) as Product[]
}
