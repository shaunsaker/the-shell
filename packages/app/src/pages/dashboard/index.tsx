import { HeadingText, Loading, SmallText } from 'components'
import React from 'react'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { Header } from '@/components/header/Header'
import { PageLayout } from '@/components/pageLayout/PageLayout'

export const Dashboard = () => {
  const { data: hasActiveSubscription, isLoading } = useRestrictedSubscriptionRoute()

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription) {
    return null
  }

  return (
    <>
      <Header />

      <PageLayout>
        <HeadingText>Dashboard</HeadingText>

        <SmallText className="mt-2">Insert your app here 🚀</SmallText>
      </PageLayout>
    </>
  )
}
