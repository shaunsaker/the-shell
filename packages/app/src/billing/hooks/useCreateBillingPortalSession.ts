import { useMutation } from '@tanstack/react-query'

import { useLink } from '../../utils/useLink'
import { createBillingPortalSession } from '../api/createBillingPortalSession'

export const useCreateBillingPortalSession = () => {
  const link = useLink()

  return useMutation({
    mutationFn: createBillingPortalSession,
    onSuccess: response => {
      // on success, redirect to the billing portal
      link(response.data.url, '_self')
    },
  })
}
