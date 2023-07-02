// deno-lint-ignore-file no-case-declarations no-fallthrough
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

import { Stripe, stripe } from '../services/stripe/index.ts'
import { deleteProductRecord } from '../services/supabase/deleteProductRecord.ts'
import { manageSubscriptionStatusChange } from '../services/supabase/manageSubscriptionStatusChange.ts'
import { upsertPriceRecord } from '../services/supabase/upsertPriceRecord.ts'
import { upsertProductRecord } from '../services/supabase/upsertProductRecord.ts'

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('Hello from Stripe Webhook!')

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

// This handler will be called for every incoming request.
serve(async (request): Promise<Response> => {
  const signature = request.headers.get('Stripe-Signature')

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text()

  let event
  try {
    // @ts-expect-error FIXME: stripe types in Deno are currently broken
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET'),
      undefined,
      cryptoProvider
    )
  } catch (error) {
    console.error(error)
    return new Response(error.message, { status: 400 })
  }

  // We use this event to query the Stripe API in order to avoid
  // handling any forged event. If available, we use the idempotency key.
  const requestOptions =
    event.request && event.request.idempotency_key
      ? {
          idempotencyKey: event.request.idempotency_key,
        }
      : {}

  let retrievedEvent
  try {
    // @ts-expect-error FIXME: stripe types in Deno are currently broken
    retrievedEvent = await stripe.events.retrieve(event.id, requestOptions)
  } catch (error) {
    return new Response(error.message, { status: 400 })
  }

  if (relevantEvents.has(retrievedEvent.type)) {
    try {
      switch (retrievedEvent.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(retrievedEvent.data.object)
          break
        case 'product.deleted':
          await deleteProductRecord(retrievedEvent.data.object.id)
          break
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(retrievedEvent.data.object)
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        // eslint-disable-next-line
        case 'customer.subscription.deleted':
          const subscription = retrievedEvent.data.object

          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            retrievedEvent.type === 'customer.subscription.created'
          )
          break
        case 'checkout.session.completed':
          const checkoutSession = retrievedEvent.data.object
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription
            await manageSubscriptionStatusChange(subscriptionId as string, checkoutSession.customer as string, true)
          }
          break
        default:
          console.error('Unhandled relevant event!', retrievedEvent.type)
          throw new Error('Unhandled relevant event!')
      }
    } catch (error) {
      console.error(retrievedEvent.type, error)
      return new Response('Webhook handler failed. View logs.', {
        status: 400,
      })
    }
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
