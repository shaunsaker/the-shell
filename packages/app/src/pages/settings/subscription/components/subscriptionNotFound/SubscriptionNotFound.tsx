import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'

import app from '../../../../../../../common/app.json'
import { BlankState } from '../../../../../components/blankState/BlankState'
import { useLink } from '../../../../../utils/useLink'

export const SubscriptionNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="No subscription found"
        description="We could not find your subscription. If the problem persists, contact support"
      >
        <Button onClick={() => link(`mailto:${app.supportEmail}`)}>Contact support</Button>
      </BlankState>
    </main>
  )
}
