import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '../../auth/hooks/useSignOut'
import { routes } from '../../routes'
import { Headerbar } from '../headerbar/Headerbar'
import { Navbar, NavigationItem } from '../navbar/Navbar'

export const SettingsNavbar = (): ReactElement => {
  const { mutate: signOut, isLoading } = useSignOut()
  const location = useLocation()
  const navigate = useNavigate()

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
    },
  ]

  return (
    <Headerbar>
      <Navbar
        items={items}
        onClick={href => {
          navigate(href)
        }}
      />

      <Button
        variant="light"
        loading={isLoading}
        onClick={() => {
          signOut()
        }}
      >
        Sign Out
      </Button>
    </Headerbar>
  )
}
