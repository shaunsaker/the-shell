import { handleApiError } from '../../utils/handleApiError'
import { invokeFunction } from '../../utils/invokeFunction'

export const updateSubscriptionQuantity = async (quantity: number) => {
  const { data, error } = await invokeFunction('update-subscription-quantity', {
    body: {
      quantity,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data as { ok: boolean }
}
