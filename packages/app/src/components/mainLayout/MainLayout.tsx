import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useHasActiveSubscription } from '../../billing/hooks/useHasActiveSubscription'
import { routes } from '../../router/routes'
import { NavigationItem } from '../../types'
import { Sidebar } from '../sidebar/Sidebar'

export const MainLayout = (): ReactElement => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: routes.dashboard,
      icon: <HomeModernIcon />,
      isActive: location.pathname === routes.dashboard,
      disabled: hasActiveSubscriptionLoading || !hasActiveSubscription,
    },
    {
      name: 'Settings',
      href: routes.settings,
      icon: <Cog6ToothIcon />,
      isActive: location.pathname.startsWith(routes.settings),
    },
  ]

  return (
    <div className="flex h-full">
      <Sidebar
        items={navigationItems}
        onClick={href => {
          navigate(href)
        }}
      />

      <div className="bg-theme-background dark:bg-dark-theme-background flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
