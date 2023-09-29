import React, { ReactElement } from 'react'

import { useHasActiveSubscription } from '../../../billing/hooks/useHasActiveSubscription'
import { useSubscriptionSeats } from '../../../billing/hooks/useSubscriptionSeats'
import { Loading } from '../../../components/loading/Loading'
import { SettingsList } from '../../../components/settingsList/SettingsList'
import { ManagedSubscriptionSection } from './components/managedSubscriptionSection/ManagedSubscriptionSection'
import { Pricing } from './components/pricing/Pricing'
import { SubscriptionDetailsSection } from './components/subscriptionDetailsSection/SubscriptionDetailsSection'
import { SubscriptionSeatsSection } from './components/subscriptionSeatsSection/SubscriptionSeatsSection'

export const SettingsSubscription = (): ReactElement => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: subscriptionSeats, isLoading: subscriptionSeatsLoading } = useSubscriptionSeats()

  const isLoading = hasActiveSubscriptionLoading || subscriptionSeatsLoading

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription) {
    return <Pricing />
  }

  const isSubscriptionOwner = subscriptionSeats?.some(seat => seat.isSubscriptionOwner)
  const hasManagedSubscription = !isSubscriptionOwner

  if (hasManagedSubscription) {
    return <ManagedSubscriptionSection />
  }

  return (
    <SettingsList>
      <SubscriptionDetailsSection />

      <SubscriptionSeatsSection />
    </SettingsList>
  )
}
