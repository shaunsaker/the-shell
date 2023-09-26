import React from 'react'

import { useRestrictedSubscriptionRoute } from '../../billing/hooks/useRestrictedSubscriptionRoute'
import { Headerbar } from '../../components/headerbar/Headerbar'
import { Heading } from '../../components/heading/Heading'
import { Loading } from '../../components/loading/Loading'
import { PageLayout } from '../../components/pageLayout/PageLayout'
import { Text } from '../../components/text/Text'

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
      <Headerbar />

      <PageLayout>
        <Heading>Dashboard</Heading>

        <Text className="mt-2">Insert your app here 🚀</Text>
      </PageLayout>
    </>
  )
}
