import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

import { BlankState } from '../../../../../../components/blankState/BlankState'
import { useLink } from '../../../../../../hooks/utils/useLink'

export const ProductsNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="No products found"
        description="Create them in your Stripe dashboard. Hint: If you've already created them, make sure your Stripe listener and Supabase functions are being served. Edit the prices metadata and your local db should reflect the products and prices."
        buttonText="Go to Stripe dashboard"
        buttonAction={() => link('https://dashboard.stripe.com/dashboard', '_blank')}
      />
    </main>
  )
}
