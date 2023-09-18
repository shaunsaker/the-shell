import { collection, getDocs, query, where } from 'firebase/firestore'
import { Price } from 'types'

import { db } from '../../firebase'

// fetch the active prices
export const getPrices = async () => {
  const ref = collection(db, 'prices')
  const queryRef = query(ref, where('active', '==', true))

  const prices = await getDocs(queryRef)

  return prices.docs.map(price => ({
    id: price.id,
    ...price.data(),
  })) as Price[]
}
