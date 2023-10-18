import { useMutation } from '@tanstack/react-query'

import { createCheckoutSession } from '../api/createCheckoutSession'

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: response => {
      // on success, redirect to the checkout session
      window.open(response.data.url, '_self')
    },
  })
}
