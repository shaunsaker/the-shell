import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { routes } from '../../routes'
import { NavigationItem, Sidebar } from '../sidebar/Sidebar'

export const MainLayout = (): ReactElement => {
  const location = useLocation()
  const navigate = useNavigate()

  const items: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: routes.dashboard,
      icon: HomeModernIcon,
      isActive: location.pathname === routes.dashboard,
    },
    {
      name: 'Settings',
      href: routes.settings,
      icon: Cog6ToothIcon,
      isActive: location.pathname.startsWith(routes.settings),
    },
  ]

  return (
    <div className="flex h-full">
      <Sidebar
        items={items}
        onClick={href => {
          navigate(href)
        }}
      />

      <div className="flex flex-1 flex-col overflow-hidden bg-tremor-background dark:bg-dark-tremor-background">
        <Outlet />
      </div>
    </div>
  )
}
