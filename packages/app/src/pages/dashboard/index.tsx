import React, { ReactElement } from 'react'

import { Headerbar } from '../../components/headerbar/Headerbar'
import { Heading } from '../../components/heading/Heading'
import { PageLayout } from '../../components/pageLayout/PageLayout'
import { Text } from '../../components/text/Text'

export const Dashboard = (): ReactElement => {
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
