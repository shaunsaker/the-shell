import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export type NavigationItem = {
  name: string
  href: string
  isActive: (pathname: string) => boolean
}

type Props = {
  items: NavigationItem[]
}

export const Navbar = ({ items }: Props): ReactElement => {
  const location = useLocation()

  return (
    <ul className="mr-4 lg:mr-8 flex h-full flex-1 gap-x-2 lg:gap-x-4 overflow-x-auto">
      {items.map(item => (
        <li key={item.name} className="h-full">
          <Link
            to={item.href}
            className={twMerge(
              item.isActive(location.pathname)
                ? 'border-tremor-brand text-tremor-content-strong dark:border-dark-tremor-brand dark:text-dark-tremor-content-strong'
                : 'border-transparent text-tremor-content hover:border-tremor-border hover:text-tremor-content-emphasis dark:text-dark-tremor-content dark:hover:border-dark-tremor-border dark:hover:text-dark-tremor-content-emphasis',
              'inline-flex h-full items-center border-b-2 px-1 pt-1 text-sm font-medium',
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
