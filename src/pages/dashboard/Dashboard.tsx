import { Metric } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Layout } from '../../components/layout/Layout'

export const Dashboard = (): ReactElement => {
  return (
    <Layout>
      <Metric className="">Dashboard</Metric>
    </Layout>
  )
}
