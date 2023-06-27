import React, { ReactElement } from 'react'

import { Headerbar } from '../../components/headerbar/Headerbar'
import { Layout } from '../../components/layout/Layout'
import { PageContent } from '../../components/pageContent/PageContent'

export const Dashboard = (): ReactElement => {
  return (
    <Layout>
      <Headerbar />

      <PageContent></PageContent>
    </Layout>
  )
}
