import Stripe from 'https://esm.sh/stripe@11.16.0?target=deno&no-check'

export const stripe = Stripe(Deno.env.get('STRIPE_API_KEY'))

export { Stripe }
