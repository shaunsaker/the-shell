import React, { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '../../auth/hooks/useSignOut'
import { useSubscription } from '../../billing/hooks/useSubscription'
import { routes } from '../../router/routes'
import { NavigationItem } from '../../types'
import { Button } from '../button/Button'
import { Headerbar } from '../headerbar/Headerbar'
import { Navbar } from '../navbar/Navbar'

export const SettingsNavbar = (): ReactElement => {
  const { mutate: signOut, isLoading } = useSignOut()
  const location = useLocation()
  const navigate = useNavigate()
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()

  const hasSubscription = subscription?.status === 'active'
  const items: NavigationItem[] = [
    {
      name: 'Account',
      href: routes.settingsAccount,
      isActive: location.pathname.includes(routes.settingsAccount),
    },
    {
      name: 'Subscription',
      href: routes.settingsSubscription,
      isActive: location.pathname.includes(routes.settingsSubscription),
    },
    {
      name: 'Teams',
      href: routes.settingsTeams,
      isActive: location.pathname.includes(routes.settingsTeams),
      disabled: subscriptionLoading || !hasSubscription,
    },
  ]

  return (
    <Headerbar>
      <Navbar
        items={items}
        onClick={href => {
          navigate(href)
        }}
      >
        <Button
          className="rounded-none"
          variant="light"
          loading={isLoading}
          onClick={() => {
            signOut()
          }}
        >
          Sign Out
        </Button>
      </Navbar>
    </Headerbar>
  )
}
