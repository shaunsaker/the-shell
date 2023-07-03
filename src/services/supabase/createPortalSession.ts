import { supabase } from '.'

export const createPortalSession = async () => {
  const { data, error } = await supabase.functions.invoke('create-billing-portal-session', {
    body: {
      returnUrl: window.location.href,
    },
  })

  if (error) {
    throw error
  }

  return data as { url: string }
}
