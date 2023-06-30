import { stripe } from '.'

export const createBillingPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: window.location.href,
  })

  return session
}
