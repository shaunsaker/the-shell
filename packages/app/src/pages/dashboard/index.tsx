import React from 'react'

import { useRestrictedSubscriptionRoute } from '../../billing/hooks/useRestrictedSubscriptionRoute'
import { Headerbar } from '../../components/headerbar/Headerbar'
import { Heading } from '../../components/heading/Heading'
import { PageLayout } from '../../components/pageLayout/PageLayout'
import { Text } from '../../components/text/Text'

export const Dashboard = () => {
  useRestrictedSubscriptionRoute()

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
