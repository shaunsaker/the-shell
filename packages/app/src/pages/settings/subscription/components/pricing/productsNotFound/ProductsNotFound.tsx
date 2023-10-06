import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

import { BlankState } from '@/components/blankState/BlankState'
import { Button } from '@/components/button/Button'
import { useLink } from '@/utils/useLink'

export const ProductsNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="No products found"
        description="Create them in your Stripe dashboard."
      >
        <Button onClick={() => link('https://dashboard.stripe.com/dashboard', '_blank')}>Go to Stripe dashboard</Button>
      </BlankState>
    </main>
  )
}
