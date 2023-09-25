import { vi } from 'vitest'

export type Product = {
  id: string
  name: string
  description: string
  active: boolean
  image: string
  metadata?: { freeTrialDays: number; teamPlan: boolean } | Record<string, string>
}

const makeProduct = (id: string): Product => ({
  id,
  name: 'Product',
  description: 'Product description',
  active: true,
  image: 'https://via.placeholder.com/150',
  metadata: {},
})

export const MOCK_ACTIVE_PRODUCT_ID = 'prod_123'

export const useProductsMock = vi.fn(() => ({
  data: [makeProduct(MOCK_ACTIVE_PRODUCT_ID), makeProduct('prod_456')],
}))

vi.mock('../useProducts', () => ({
  useProducts: useProductsMock,
}))
