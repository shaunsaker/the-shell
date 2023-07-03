import { supabase } from '.'

export const createCheckoutSession = async (priceId: string) => {
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: {
      priceId,
      successUrl: window.location.href,
      cancelUrl: window.location.href,
    },
  })

  if (error) {
    throw error
  }

  return data as { url: string }
}
