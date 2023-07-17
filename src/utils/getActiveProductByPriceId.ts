import { ProductWithPrices } from '../models'

export const getActiveProductByPriceId = (products?: ProductWithPrices[] | null, priceId?: string | null) => {
  if (!products || !priceId) {
    return null
  }

  const product = products.find(product => {
    return product.prices.some(price => price.id === priceId)
  })

  if (!product) {
    throw new Error(`No product found for price id ${priceId}`)
  }

  return product
}
