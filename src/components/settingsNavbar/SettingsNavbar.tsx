import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { useSignOut } from '../../hooks/auth/useSignOut'
import { routes } from '../../routes'
import { Headerbar } from '../headerbar/Headerbar'

type NavigationItem = {
  name: string
  href: string
  isActive: (pathname: string) => boolean
}

const navigation: NavigationItem[] = [
  {
    name: 'Account',
    href: routes.settingsAccount,
    isActive: (pathname: string) => pathname.includes(routes.settingsAccount),
  },
  {
    name: 'Billing',
    href: routes.settingsBilling,
    isActive: (pathname: string) => pathname.includes(routes.settingsBilling),
  },
  {
    name: 'Teams',
    href: routes.settingsTeams,
    isActive: (pathname: string) => pathname.includes(routes.settingsTeams),
  },
]

export const SettingsNavbar = (): ReactElement => {
  const location = useLocation()

  const { mutate: signOut, isLoading } = useSignOut()

  return (
    <Headerbar>
      <ul className="mr-8 flex h-full flex-1 gap-x-4 overflow-x-auto">
        {navigation.map(item => (
          <li key={item.name} className="h-full">
            <Link
              to={item.href}
              className={twMerge(
                item.isActive(location.pathname)
                  ? 'border-tremor-brand text-tremor-content-strong dark:border-dark-tremor-brand dark:text-dark-tremor-content-strong'
                  : 'border-transparent text-tremor-content hover:border-tremor-border hover:text-tremor-content-emphasis dark:text-dark-tremor-content dark:hover:border-dark-tremor-border dark:hover:text-dark-tremor-content-emphasis',
                'inline-flex h-full items-center border-b-2 px-1 pt-1 text-sm font-medium'
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

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
