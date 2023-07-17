import { supabaseAdmin } from './supabaseAdmin.ts'

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
    type: price.type,
    unit_amount: price.unit_amount,
    interval: price.recurring.interval,
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
