import { supabase } from '..'
import { handleApiError } from '../utils/handleApiError'

export const createBillingPortalSession = async () => {
  const { data, error } = await supabase.functions.invoke('create-billing-portal-session', {
    body: {
      returnUrl: location.href,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data as { url: string }
}
