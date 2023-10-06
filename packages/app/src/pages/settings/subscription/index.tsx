import React, { ReactElement } from 'react'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useIsSubscriptionOwner } from '@/billing/hooks/useIsSubscriptionOwner'
import { Loading } from '@/components/loading/Loading'
import { SettingsList } from '@/components/settingsList/SettingsList'

import { ManagedSubscriptionSection } from './components/managedSubscriptionSection/ManagedSubscriptionSection'
import { Pricing } from './components/pricing/Pricing'
import { SubscriptionDetailsSection } from './components/subscriptionDetailsSection/SubscriptionDetailsSection'
import { SubscriptionSeatsSection } from './components/subscriptionSeatsSection/SubscriptionSeatsSection'

export const SettingsSubscription = (): ReactElement => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: isSubscriptionOwner, isLoading: isSubscriptionOwnerLoading } = useIsSubscriptionOwner()

  const isLoading = hasActiveSubscriptionLoading || isSubscriptionOwnerLoading

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription) {
    return <Pricing />
  }

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
