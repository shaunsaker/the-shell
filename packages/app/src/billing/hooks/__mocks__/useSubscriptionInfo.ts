import { SubscriptionStatus } from 'types'
import { vi } from 'vitest'

import { MOCK_ACTIVE_PRICE_ID } from './usePrices'

export const useSubscriptionInfoMock = vi.fn(() => ({
  data: {
    priceId: MOCK_ACTIVE_PRICE_ID,
    status: SubscriptionStatus.Active,
  },
}))

vi.mock('../useSubscriptionInfo', () => ({
  useSubscriptionInfo: useSubscriptionInfoMock,
}))
