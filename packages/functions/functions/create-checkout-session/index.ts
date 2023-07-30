import { Handler } from '@netlify/functions'

import { getAuthUser } from '../../auth/getAuthUser'
import { createCheckoutSession } from '../../billing/createCheckoutSession'
import { createOrRetrieveCustomer } from '../../billing/createOrRetrieveCustomer'
import { fetchProductByPriceId } from '../../billing/fetchProductByPriceId'
import { corsHeaders } from '../../utils/cors'

console.log('Hello from Create Checkout Session!')

export const handler: Handler = async event => {
  // This is needed if you're planning to invoke your function from a browser
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { ...corsHeaders },
    }
  }

  try {
    // Authorized api requests only
    // Retrieve the logged in user
    const {
      data: { user },
    } = await getAuthUser(event.headers.authorization)

    if (!user) {
      return {
        statusCode: 401,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Unauthorized' }),
      }
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { Allow: 'POST', ...corsHeaders },
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      }
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Missing POST body' }),
      }
    }

    // Retrieve or create the customer in Stripe
    const customerId = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    // Destructure the data from the POST body
    const { priceId, quantity = 1, successUrl, cancelUrl, metadata = {} } = JSON.parse(event.body)

    // Get the product using the priceId from supabase and pass product.metadata.freeTrialDays to createCheckoutSession
    const product = await fetchProductByPriceId(priceId)
    // FIXME: types
    const productMetadata = product.metadata as any
    const freeTrialDays = productMetadata?.freeTrialDays ? parseInt(productMetadata.freeTrialDays) : undefined

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

    if (session) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders },
        body: JSON.stringify({ url: session.url }),
      }
    } else {
      return {
        statusCode: 500,
        headers: { ...corsHeaders },
        body: JSON.stringify({ message: 'Session is not defined' }),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { ...corsHeaders },
      body: JSON.stringify({ message: 'Internal server error' }),
    }
  }
}
