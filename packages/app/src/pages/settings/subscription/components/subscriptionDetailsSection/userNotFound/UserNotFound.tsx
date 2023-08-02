import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

import app from '../../../../../../../../common/app.json'
import { BlankState } from '../../../../../../components/blankState/BlankState'
import { Button } from '../../../../../../components/button/Button'
import { useLink } from '../../../../../../utils/useLink'

export const UserNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="User not found"
        description="We could not find your user data. If the problem persists, contact support"
      >
        <Button onClick={() => link(`mailto:${app.supportEmail}`)}>Contact support</Button>
      </BlankState>
    </main>
  )
}
