import { useMutation } from '@tanstack/react-query'

import { useLink } from '../../utils/useLink'
import { createBillingPortalSession } from '../api/createBillingPortalSession'

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
