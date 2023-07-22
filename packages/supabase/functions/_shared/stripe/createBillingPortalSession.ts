import { stripe } from './index.ts'

export const createBillingPortalSession = async ({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) =>
  // @ts-expect-error FIXME: stripe types in Deno are currently broken
  await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
