import { Firestore, Price, PricingPlanInterval, PricingType } from 'types'

import { firebase } from '../firebaseAdmin'
import { Stripe } from './stripe'

const parsePriceType = (priceType: string): PricingType => {
  switch (priceType) {
    case 'recurring':
      return PricingType.Recurring
    case 'one_time':
      return PricingType.OneTime
    default:
      return PricingType.Recurring
  }
}

const parsePricingPlanInterval = (pricingPlanInterval: string): PricingPlanInterval => {
  switch (pricingPlanInterval) {
    case 'day':
      return PricingPlanInterval.Day
    case 'week':
      return PricingPlanInterval.Week
    case 'month':
      return PricingPlanInterval.Month
    case 'year':
      return PricingPlanInterval.Year
    default:
      return PricingPlanInterval.Month
  }
}

export const updatePrice = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    productId: price.product as string,
    active: price.active,
    currency: price.currency,
    type: parsePriceType(price.type),
    interval: parsePricingPlanInterval(price.recurring?.interval || 'month'),
    intervalCount: price.recurring?.interval_count || 1,
    trialPeriodDays: price.recurring?.trial_period_days || 0,
    unitAmount: price.unit_amount || 0,
    metadata: price.metadata,
  }

  await firebase.firestore().collection(Firestore.Prices).doc(price.id).set(priceData)
}
