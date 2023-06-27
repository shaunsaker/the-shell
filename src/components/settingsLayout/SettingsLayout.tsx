import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from '../layout/Layout'
import { PageContent } from '../pageContent/PageContent'
import { SettingsNavbar } from '../settingsNavbar/SettingsNavbar'

export const SettingsLayout = (): ReactElement => {
  return (
    <Layout>
      <SettingsNavbar />

      <PageContent>
        <Outlet />
      </PageContent>
    </Layout>
  )
}
