import Stripe from 'stripe'

export const stripe = new Stripe(
  import.meta.env.VITE_STRIPE_SECRET_KEY_LIVE || import.meta.env.VITE_STRIPE_SECRET_KEY || '',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
  }
)
