import { useMutation } from '@tanstack/react-query'

import { createBillingPortalSession } from '../../api/subscriptions/createBillingPortalSession'
import { useLink } from '../utils/useLink'

export const useCreateBillingPortalSession = () => {
  const link = useLink()

  return useMutation({
    mutationFn: createBillingPortalSession,
    onSuccess: ({ url }) => {
      // on success, redirect to the billing portal
      link(url, '_self')
    },
  })
}
