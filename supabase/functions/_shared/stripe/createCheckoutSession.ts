import { stripe } from './index.ts'

export const createCheckoutSession = async ({
  customerId,
  priceId,
  quantity,
  freeTrialDays,
  metadata,
  successUrl,
  cancelUrl,
}: {
  customerId: string
  priceId: string
  quantity?: number
  freeTrialDays?: number
  metadata?: Record<string, string>
  successUrl: string
  cancelUrl: string
}) =>
  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer: customerId,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: priceId,
        quantity,
        adjustable_quantity: {
          enabled: true,
        },
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: freeTrialDays,
      metadata,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
