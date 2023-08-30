import { Functions } from '../../types/firebase'
import { invokeFunction } from '../../utils/invokeFunction'

const createBillingPortalSessionFunction = invokeFunction(Functions.createBillingPortalSession)

export const createBillingPortalSession = async () => {
  const response = await createBillingPortalSessionFunction({ returnUrl: window.location.href })

  return response
}
