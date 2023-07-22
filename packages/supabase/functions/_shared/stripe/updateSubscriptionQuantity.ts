import { stripe } from './index.ts'

export const updateSubscriptionQuantity = async ({
  subscriptionId,
  quantity,
}: {
  subscriptionId: string
  quantity: string
}) => {
  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  if (!subscription) {
    throw new Error(`Subscription ${subscriptionId} not found`)
  }

  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  stripe.subscriptions.update(subscription.id, {
    cancel_at_period_end: false,
    proration_behavior: 'create_prorations',
    items: [
      {
        id: subscription.items.data[0].id,
        quantity,
      },
    ],
  })
}
