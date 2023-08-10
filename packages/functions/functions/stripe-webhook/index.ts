import { Handler } from '@netlify/functions'

import { Stripe, stripe } from '../../billing'
import { deleteProduct } from '../../billing/deleteProduct'
import { manageSubscriptionStatusChange } from '../../billing/manageSubscriptionStatusChange'
import { updatePrice } from '../../billing/updatePrice'
import { updateProduct } from '../../billing/updateProduct'

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createNodeCryptoProvider()

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

export const handler: Handler = async event => {
  console.log(event.headers)
  const signature = event.headers['stripe-signature']

  if (!signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing signature header' }),
    }
  }

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = event.body

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    }
  }

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET || '',
      undefined,
      cryptoProvider,
    )
  } catch (error) {
    console.error(error)

    return {
      statusCode: 400,
      body: JSON.stringify({ message: (error as Error).message }),
    }
  }

  // We use this event to query the Stripe API in order to avoid
  // handling any forged event. If available, we use the idempotency key.
  const requestOptions = event.headers['Idempotency-Key']
    ? {
        idempotencyKey: event.headers['Idempotency-Key'],
      }
    : {}

  let retrievedEvent: Stripe.Event
  try {
    retrievedEvent = await stripe.events.retrieve(stripeEvent.id, requestOptions)
  } catch (error) {
    console.error(error)

    return {
      statusCode: 400,
      body: JSON.stringify({ message: (error as Error).message }),
    }
  }

  if (relevantEvents.has(retrievedEvent.type)) {
    try {
      switch (retrievedEvent.type) {
        case 'product.created':
        case 'product.updated':
          await updateProduct(retrievedEvent.data.object as any)
          break
        case 'product.deleted':
          await deleteProduct((retrievedEvent.data.object as any).id)
          break
        case 'price.created':
        case 'price.updated':
          await updatePrice(retrievedEvent.data.object as any)
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        // eslint-disable-next-line
        case 'customer.subscription.deleted':
          const subscription = retrievedEvent.data.object as any

          await manageSubscriptionStatusChange(
            subscription.id,

            subscription.customer as string,
            retrievedEvent.type === 'customer.subscription.created',
          )
          break
        case 'checkout.session.completed':
          const checkoutSession = retrievedEvent.data.object as any

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

      return {
        statusCode: 400,
        body: JSON.stringify({ message: (error as Error).message }),
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  }
}
