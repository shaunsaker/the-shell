import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const createCheckoutSession = async (priceId: string) => {
  const { data, error } = await invokeFunction('create-checkout-session', {
    body: {
      priceId,
      successUrl: window.location.href,
      cancelUrl: window.location.href,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data as { url: string }
}
