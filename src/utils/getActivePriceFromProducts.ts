import { ProductWithPrices } from '../models'
import { getActiveProductByPriceId } from './getActiveProductByPriceId'

export const getActivePriceFromProducts = (products?: ProductWithPrices[] | null, priceId?: string | null) => {
  if (!priceId || !products) {
    return null
  }

  const product = getActiveProductByPriceId(products, priceId)

  if (!product) {
    throw new Error(`No product found for price id ${priceId}`)
  }

  const price = product.prices.find(price => price.id === priceId)

  if (!price) {
    throw new Error(`No price found for price id ${priceId}`)
  }

  return price
}
