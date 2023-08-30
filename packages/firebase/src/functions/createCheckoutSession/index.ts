import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getAuthUser } from '../../auth/getAuthUser'
import { createCheckoutSession } from '../../billing/createCheckoutSession'
import { createCustomer } from '../../billing/createCustomer'
import { getCustomer } from '../../billing/getCustomer'
import { getProductByPriceId } from '../../billing/getProductByPriceId'
import { Functions, FunctionsMap } from '../../models'

console.log('Hello from Create Checkout Session!')

export const createCheckoutSessionFunction = onCall<
  FunctionsMap[Functions.createCheckoutSession]['data'],
  Promise<FunctionsMap[Functions.createCheckoutSession]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    // Get the user from the request
    const user = await getAuthUser(request.auth.uid)

    if (!user) {
      throw new HttpsError('not-found', 'User not found')
    }

    // Get or create the customer in Stripe
    const customer = await getCustomer(user.uid)
    let customerId = customer?.stripeCustomerId

    if (!customerId) {
      customerId = await createCustomer({
        uid: user.uid,
        email: user.email || '',
      })
    }
    // Destructure the data from the POST body
    const { priceId, quantity, successUrl, cancelUrl, metadata = {} } = request.data

    // Get the product using the priceId and pass product.metadata.freeTrialDays to createCheckoutSession
    const product = await getProductByPriceId(priceId)
    const freeTrialDays = product.metadata?.freeTrialDays ? Number(product.metadata.freeTrialDays) : undefined

    // Create a checkout session in Stripe
    const session = await createCheckoutSession({
      customerId,
      priceId,
      quantity,
      freeTrialDays,
      metadata,
      successUrl,
      cancelUrl,
    })

    if (session?.url) {
      return {
        url: session.url,
      }
    } else {
      throw new HttpsError('internal', 'Unable to create checkout session')
    }
  } catch (error) {
    throw new HttpsError('internal', (error as Error).message)
  }
})
