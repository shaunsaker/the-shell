import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { createCheckoutSession } from '../services/stripe/createCheckoutSession.ts'
import { createOrRetrieveCustomer } from '../services/supabase/createOrRetrieveCustomer.ts'
import { supabaseClient } from '../services/supabase/index.ts'

console.log('Hello from Create Checkout Session!')

serve(async (request): Promise<Response> => {
  // This is needed if you're planning to invoke your function from a browser
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 405,
    })
  }

  // 1. Destructure the data from the POST body
  const { priceId, quantity = 1, successUrl, cancelUrl, metadata = {} } = await request.json()

  try {
    // 2. Retrieve the logged in user
    const {
      data: { user },
    } = await supabaseClient(request).auth.getUser()

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
        }
      )
    }

    // 3. Retrieve or create the customer in Stripe
    const customerId = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    // 4. Create a checkout session in Stripe
    const session = await createCheckoutSession({
      customerId,
      priceId,
      quantity,
      metadata,
      successUrl,
      cancelUrl,
    })

    if (session) {
      return new Response(JSON.stringify({ url: session.url }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      })
    } else {
      return new Response(
        JSON.stringify({
          error: { statusCode: 500, message: 'Session is not defined' },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 500,
        }
      )
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    })
  }
})
