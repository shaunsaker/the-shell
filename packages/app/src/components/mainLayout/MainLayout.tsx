import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../sidebar/Sidebar'

export const MainLayout = (): ReactElement => {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden bg-tremor-background dark:bg-dark-tremor-background">
        <Outlet />
      </div>
    </div>
  )
}
