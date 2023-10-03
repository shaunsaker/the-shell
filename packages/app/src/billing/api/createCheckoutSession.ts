import { Functions } from 'types'

import { invokeFunction } from '../../utils/invokeFunction'

const createCheckoutSessionFunction = invokeFunction(Functions.createCheckoutSession)

export const createCheckoutSession = async ({ priceId, quantity }: { priceId: string; quantity: number }) => {
  const response = await createCheckoutSessionFunction({
    priceId,
    quantity,
    successUrl: window.location.href,
    cancelUrl: window.location.href,
  })

  return response
}
