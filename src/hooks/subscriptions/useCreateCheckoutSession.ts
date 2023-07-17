import { useMutation } from '@tanstack/react-query'

import { createCheckoutSession } from '../../api/subscriptions/createCheckoutSession'
import { useLink } from '../utils/useLink'

export const useCreateCheckoutSession = () => {
  const link = useLink()

  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      // on success, redirect to the checkout session
      link(url, '_self')
    },
  })
}
