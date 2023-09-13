import { collection, getDocs, query, where } from 'firebase/firestore'
import { Price } from 'types'

import { db } from '../../firebase'

// fetch the active prices
export const getPrices = async () => {
  const prices = await getDocs(query(collection(db, 'prices'), where('active', '==', true)))

  return prices.docs.map(price => ({
    id: price.id,
    ...price.data(),
  })) as Price[]
}
