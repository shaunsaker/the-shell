import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'

import app from '../../../../../../../app.json'
import { BlankState } from '../../../../../../components/blankState/BlankState'
import { useLink } from '../../../../../../hooks/utils/useLink'

export const UserNotFound = (): ReactElement => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="User not found"
        description="We could not find your user data. If the problem persists, contact support"
        buttonText="Contact support"
        buttonAction={() => link(`mailto:${app.supportEmail}`)}
      />
    </main>
  )
}
