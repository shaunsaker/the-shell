import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { updateSubscriptionQuantity } from '../_shared/stripe/updateSubscriptionQuantity.ts'
import { fetchSubscriptionByUserId } from '../_shared/supabase/fetchSubscriptionByUserId.ts'
import { getAuthUser } from '../_shared/supabase/getAuthUser.ts'

console.log('Hello from Update Subscription Quantity!')

serve(async (request): Promise<Response> => {
  // This is needed if you're planning to invoke your function from a browser
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      headers: { ...corsHeaders, Allow: 'POST' },
      status: 405,
    })
  }

  // Destructure the data from the POST body
  const { quantity } = await request.json()

  try {
    // Retrieve the logged in user
    const {
      data: { user },
    } = await getAuthUser(request)

    if (!user) {
      return new Response(
        JSON.stringify({
          error: { statusCode: 401, message: 'Unauthorized' },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 401,
        },
      )
    }

    // Get the Stripe subscriptionId using the userId
    const { id: subscriptionId } = await fetchSubscriptionByUserId(user.id)

    // Update the subscription quantity in Stripe
    await updateSubscriptionQuantity({ subscriptionId, quantity })

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    })
  }
})
