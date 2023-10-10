import { Cog6ToothIcon, EnvelopeOpenIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { Sidebar } from 'components'
import React, { ComponentProps, ReactElement } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { routes } from '@/router/routes'
import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'
import { isExternalLink } from '@/utils/isExternalLink'
import { useLink } from '@/utils/useLink'

import { app } from '../../../../config/src'

type NavigationItem = ComponentProps<typeof Sidebar>['items'][0]

export const MainLayout = (): ReactElement => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()

  const navigate = useNavigate()
  const link = useLink()

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: routes.dashboard,
      icon: <HomeModernIcon />,
      active: location.pathname === routes.dashboard,
      disabled: hasActiveSubscriptionLoading || !hasActiveSubscription,
    },
    {
      name: 'Settings',
      href: routes.settings,
      icon: <Cog6ToothIcon />,
      active: location.pathname.startsWith(routes.settings),
    },
    {
      name: 'Support',
      href: `mailto:${app.supportEmail}`,
      icon: <EnvelopeOpenIcon />,
      active: false,
    },
  ]

  return (
    <div className="flex h-full">
      <Sidebar
        open={sidebarOpen}
        items={navigationItems}
        onItemClick={href => {
          if (isExternalLink(href)) {
            link(href, '_blank')

            return
          }

          navigate(href)
        }}
        onClose={() => {
          setSidebarOpen(false)
        }}
      />

      <div className="bg-theme-background dark:bg-dark-theme-background flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
