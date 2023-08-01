import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useSignOut } from '../../auth/hooks/useSignOut'
import { routes } from '../../routes'
import { Headerbar } from '../headerbar/Headerbar'
import { Navbar, NavigationItem } from '../navbar'

const items: NavigationItem[] = [
  {
    name: 'Account',
    href: routes.settingsAccount,
    isActive: (pathname: string) => pathname.includes(routes.settingsAccount),
  },
  {
    name: 'Subscription',
    href: routes.settingsSubscription,
    isActive: (pathname: string) => pathname.includes(routes.settingsSubscription),
  },
  {
    name: 'Teams',
    href: routes.settingsTeams,
    isActive: (pathname: string) => pathname.includes(routes.settingsTeams),
  },
]

export const SettingsNavbar = (): ReactElement => {
  const { mutate: signOut, isLoading } = useSignOut()

  return (
    <Headerbar>
      <Navbar items={items} />

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
