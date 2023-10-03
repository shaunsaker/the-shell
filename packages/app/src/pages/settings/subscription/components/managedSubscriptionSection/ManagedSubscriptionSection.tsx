import React, { ReactElement } from 'react'

import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'

export const ManagedSubscriptionSection = (): ReactElement => {
  return (
    <SettingsSection
      className="border-b-0"
      title="Subscription managed by another user"
      description="You're not the owner of this subscription. Please contact the subscription owner to manage your subscription."
    />
  )
}
