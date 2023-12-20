import { Cog6ToothIcon, EnvelopeOpenIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { Sidebar } from 'components'
import { app } from 'config'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLink } from 'utils'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { features } from '@/features'
import { routes } from '@/router/routes'
import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

export const AppSidebar = () => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()

  const navigate = useNavigate()
  const link = useLink()

  return (
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
}
