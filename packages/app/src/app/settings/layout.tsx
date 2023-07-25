import React, { ReactNode } from 'react'

import { PageContent } from '../../components/pageContent/PageContent'
import { SettingsNavbar } from '../../components/settingsNavbar/SettingsNavbar'
import Sidebar from '../../components/sidebar/Sidebar'

type Props = { children: ReactNode }

export default function SettingsLayout({ children }: Props) {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden bg-tremor-background dark:bg-dark-tremor-background">
        <SettingsNavbar />

        <PageContent>{children}</PageContent>
      </div>
    </div>
  )
}
