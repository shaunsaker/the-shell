import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

import app from '../../../../../../app.json'
import { BlankState } from '../../../../../components/blankState/BlankState'
import { useLink } from '../../../../../hooks/utils/useLink'

export const SubscriptionNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="No subscription found"
        description="We could not find your subscription. If the problem persists, contact support"
        buttonText="Contact support"
        buttonAction={() => link(`mailto:${app.supportEmail}`)}
      />
    </main>
  )
}
