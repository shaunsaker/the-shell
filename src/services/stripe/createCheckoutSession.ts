import { stripe } from '.'

export const createCheckoutSession = async ({ customerId, priceId }: { customerId: string; priceId: string }) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer: customerId,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_from_plan: false,
      metadata: {},
    },
    success_url: window.location.href,
    cancel_url: window.location.href,
  })

  return session
}
