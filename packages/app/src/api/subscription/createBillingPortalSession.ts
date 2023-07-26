import { handleApiError } from '../utils/handleApiError'
import { invokeFunction } from '../utils/invokeFunction'

export const createBillingPortalSession = async () => {
  const { data, error } = await invokeFunction('create-billing-portal-session', {
    body: {
      returnUrl: window.location.href,
    },
  })

  if (error) {
    await handleApiError(error)
  }

  return data as { url: string }
}
