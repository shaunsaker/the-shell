import { Metric, Text } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Headerbar } from '../../components/headerbar/Headerbar'
import { Layout } from '../../components/layout/Layout'
import { PageContent } from '../../components/pageContent/PageContent'

export const Dashboard = (): ReactElement => {
  return (
    <Layout>
      <Headerbar />

      <PageContent>
        <Metric>Dashboard</Metric>

        <Text className="mt-4">Pricing coming soon!</Text>
      </PageContent>
    </Layout>
  )
}
