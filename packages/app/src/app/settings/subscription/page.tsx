'use client'
import { useIsFetching } from '@tanstack/react-query'
import React from 'react'

import { Loading } from '../../../components/loading/Loading'
import { SettingsList } from '../../../components/settingsList/SettingsList'
import { useSubscription } from '../../../hooks/subscription/useSubscription'
import { Pricing } from './components/pricing/Pricing'
import { SubscriptionDetailsSection } from './components/subscriptionDetailsSection/SubscriptionDetailsSection'
import { SubscriptionSeatsSection } from './components/subscriptionSeatsSection/SubscriptionSeatsSection'

export default function SettingsSubscription() {
  const { data: subscription } = useSubscription()
  const isFetching = useIsFetching()

  if (isFetching) {
    return <Loading />
  }

  if (!subscription) {
    return <Pricing />
  }

  return (
    <SettingsList>
      <SubscriptionDetailsSection />

      <SubscriptionSeatsSection />
    </SettingsList>
  )
}
