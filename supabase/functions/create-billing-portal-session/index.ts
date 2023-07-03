import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { corsHeaders } from '../_shared/cors.ts'
import { createBillingPortalSession } from '../services/stripe/createBillingPortalSession.ts'
import { createOrRetrieveCustomer } from '../services/supabase/createOrRetrieveCustomer.ts'
import { getAuthUser } from '../services/supabase/getAuthUser.ts'

console.log('Hello from Create Billing Portal Session!')

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

  // 1. Destructure the data from the POST body
  const { returnUrl } = await request.json()

  try {
    // 2. Retrieve the logged in user
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
        }
      )
    }

    // 3. Retrieve or create the customer in Stripe
    const customerId = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    // 4. Create a billing potral session in Stripe
    const session = await createBillingPortalSession({ customerId, returnUrl })

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