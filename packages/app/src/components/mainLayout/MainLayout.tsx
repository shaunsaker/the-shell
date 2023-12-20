import { Cog6ToothIcon, EnvelopeOpenIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { Popover, Sidebar } from 'components'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useLink } from 'utils'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { features } from '@/features'
import { routes } from '@/router/routes'
import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

import { app } from '../../../../config'

export const MainLayout = () => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()

  const navigate = useNavigate()
  const link = useLink()

  const sidebar = (
    <Sidebar>
      <Sidebar.Item
        icon={<HomeModernIcon />}
        active={location.pathname === routes.dashboard}
        disabled={features.subscriptions && (hasActiveSubscriptionLoading || !hasActiveSubscription)}
        onClick={() => {
          navigate(routes.dashboard)

          if (sidebarOpen) {
            setSidebarOpen(false)
          }
        }}
      >
        Dashboard
      </Sidebar.Item>

      {(features.auth || features.subscriptions) && (
        <Sidebar.Item
          icon={<Cog6ToothIcon />}
          active={location.pathname.startsWith(routes.settings)}
          onClick={() => {
            navigate(routes.settings)

            if (sidebarOpen) {
              setSidebarOpen(false)
            }
          }}
        >
          Settings
        </Sidebar.Item>
      )}

      <Sidebar.Item
        icon={<EnvelopeOpenIcon />}
        onClick={() => {
          link(`mailto:${app.emails.support}`, '_blank')

          if (sidebarOpen) {
            setSidebarOpen(false)
          }
        }}
      >
        Send Feedback
      </Sidebar.Item>
    </Sidebar>
  )

  return (
    <div className="flex h-full">
      <div className="lg:hidden">
        <Popover
          open={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false)
          }}
        >
          {sidebar}
        </Popover>
      </div>

      <div className="hidden shrink-0 lg:flex lg:flex-col">{sidebar}</div>

      <div className="bg-theme-background dark:bg-dark-theme-background flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
