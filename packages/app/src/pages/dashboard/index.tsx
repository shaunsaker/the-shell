import { Heading, Loading, Text } from 'components'
import React from 'react'

import { useRestrictedSubscriptionRoute } from '@/billing/hooks/useRestrictedSubscriptionRoute'
import { CustomHeaderbar } from '@/components/customHeaderbar/CustomHeaderbar'
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
      <CustomHeaderbar />

      <PageLayout>
        <Heading>Dashboard</Heading>

        <Text className="mt-2">Insert your app here 🚀</Text>
      </PageLayout>
    </>
  )
}
