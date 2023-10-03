import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { PageLayout } from '../pageLayout/PageLayout'
import { SettingsNavbar } from '../settingsNavbar/SettingsNavbar'

export const SettingsLayout = (): ReactElement => {
  return (
    <>
      <SettingsNavbar />

      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  )
}
