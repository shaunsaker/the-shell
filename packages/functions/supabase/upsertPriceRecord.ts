import { Database } from '../types/supabase'
import { supabaseAdmin } from './supabaseAdmin'

const parsePriceType = (priceType: string): Database['public']['Enums']['pricing_type'] => {
  switch (priceType) {
    case 'recurring':
      return 'recurring'
    case 'one_time':
      return 'one_time'
    default:
      return 'recurring'
  }
}

const parsePricingPlanInterval = (
  pricingPlanInterval: string,
): Database['public']['Enums']['pricing_plan_interval'] => {
  switch (pricingPlanInterval) {
    case 'day':
      return 'day'
    case 'week':
      return 'week'
    case 'month':
      return 'month'
    case 'year':
      return 'year'
    default:
      return 'month'
  }
}

export const upsertPriceRecord = async (price: {
  id: string
  product: string
  active: boolean
  currency: string
  type: string
  unit_amount: number
  interval_count: number
  recurring: {
    interval: string
    trial_period_days: number
  }
  metadata: {
    [key: string]: string
  }
}) => {
  const priceData = {
    id: price.id,
    product_id: price.product,
    active: price.active,
    currency: price.currency,
    type: parsePriceType(price.type),
    unit_amount: price.unit_amount,
    interval: parsePricingPlanInterval(price.recurring.interval),
    interval_count: price.interval_count,
    trial_period_days: price.recurring.trial_period_days,
    metadata: price.metadata,
  }

  const { error } = await supabaseAdmin.from('prices').upsert([priceData])

  if (error) {
    throw error
  }

  console.log(`Price inserted/updated: ${price.id}`)
}
