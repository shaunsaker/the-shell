import { Price, PricingPlanInterval, PricingType } from 'types'
import { vi } from 'vitest'

import { MOCK_ACTIVE_PRODUCT_ID } from './useProducts'

const makePrice = (id: string): Price => ({
  id,
  productId: MOCK_ACTIVE_PRODUCT_ID,
  active: true,
  currency: 'usd',
  type: PricingType.Recurring,
  interval: PricingPlanInterval.Month,
  intervalCount: 1,
  trialPeriodDays: 0,
  unitAmount: 1000,
  metadata: {},
})

export const MOCK_ACTIVE_PRICE_ID = 'price_123'

export const usePricesMock = vi.fn(() => ({
  data: [makePrice(MOCK_ACTIVE_PRICE_ID), makePrice('price_456')],
}))

vi.mock('../usePrices', () => ({
  usePrices: usePricesMock,
}))
