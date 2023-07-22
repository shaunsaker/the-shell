import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const updateSubscriptionQuantity = async (quantity: number) => {
  const { data, error } = await supabase.functions.invoke('update-subscription-quantity', {
    body: {
      quantity,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data as { ok: boolean }
}
