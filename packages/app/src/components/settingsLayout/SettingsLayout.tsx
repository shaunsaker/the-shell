import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { PageContent } from '../pageContent/PageContent'
import { SettingsNavbar } from '../settingsNavbar/SettingsNavbar'

export const SettingsLayout = (): ReactElement => {
  return (
    <>
      <SettingsNavbar />

      <PageContent>
        <Outlet />
      </PageContent>
    </>
  )
}
