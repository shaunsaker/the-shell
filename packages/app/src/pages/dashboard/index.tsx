import { Text, Title } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Headerbar } from '../../components/headerbar/Headerbar'
import { PageContent } from '../../components/pageContent/PageContent'

export const Dashboard = (): ReactElement => {
  return (
    <>
      <Headerbar />

      <PageContent>
        <Title>Dashboard</Title>

        <Text className="mt-2">Insert your app here 🚀</Text>
      </PageContent>
    </>
  )
}
