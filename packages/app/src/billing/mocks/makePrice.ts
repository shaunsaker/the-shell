import { Price, PricingPlanInterval, PricingType } from 'types'

export const makePrice = ({
  id = '1',
  productId = '1',
  active = true,
  currency = 'USD',
  type = PricingType.Recurring,
  interval = PricingPlanInterval.Month,
  intervalCount = 1,
  trialPeriodDays = 0,
  unitAmount = 100,
  metadata = {},
}: Partial<Price>): Price => ({
  id,
  productId,
  active,
  currency,
  type,
  interval,
  intervalCount,
  trialPeriodDays,
  unitAmount,
  metadata,
})
