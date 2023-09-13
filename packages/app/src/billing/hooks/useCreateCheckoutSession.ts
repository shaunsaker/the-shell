import { useMutation } from '@tanstack/react-query'

import { createCheckoutSession } from '../../billing/api/createCheckoutSession'
import { useLink } from '../../utils/useLink'

export const useCreateCheckoutSession = () => {
  const link = useLink()

  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: response => {
      // on success, redirect to the checkout session
      link(response.data.url, '_self')
    },
  })
}
