import React, { ReactNode } from 'react'

import { Headerbar } from '../../components/headerbar/Headerbar'
import { PageContent } from '../../components/pageContent/PageContent'
import Sidebar from '../../components/sidebar/Sidebar'

type Props = { children: ReactNode }

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden bg-tremor-background dark:bg-dark-tremor-background">
        <Headerbar />

        <PageContent>{children}</PageContent>
      </div>
    </div>
  )
}
