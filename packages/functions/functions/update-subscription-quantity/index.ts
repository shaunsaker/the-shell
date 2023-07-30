import { Handler } from '@netlify/functions'

import { getAuthUser } from '../../auth/getAuthUser'
import { fetchSubscriptionByUserId } from '../../billing/fetchSubscriptionByUserId'
import { updateSubscriptionQuantity } from '../../billing/updateSubscriptionQuantity'
import { corsHeaders } from '../../utils/cors'

console.log('Hello from Update Subscription Quantity!')

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

    // Destructure the data from the POST body
    const { quantity } = JSON.parse(event.body)

    // Get the Stripe subscriptionId using the userId
    const { id: subscriptionId } = await fetchSubscriptionByUserId(user.id)

    // Update the subscription quantity in Stripe
    await updateSubscriptionQuantity({ subscriptionId, quantity })

    return {
      statusCode: 200,
      headers: { ...corsHeaders },
      body: JSON.stringify({ ok: true }),
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
