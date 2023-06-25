import React, { ReactElement, ReactNode } from 'react'

import Sidebar from '../sidebar/Sidebar'

type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div className="flex h-full ">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-white px-8 py-12 dark:bg-gray-900">{children}</div>
    </div>
  )
}
