import React, { ReactElement } from 'react'

import { useSubscriptions } from '../../../hooks/db/useSubscriptions'
import { BillingDetails } from './billingDetails/BillingDetails'
import { Pricing } from './pricing/Pricing'

export const SettingsBilling = (): ReactElement => {
  const { data: subscriptions, isLoading } = useSubscriptions()

  if (!isLoading && !subscriptions?.length) {
    return <Pricing />
  }

  return <BillingDetails />
}
