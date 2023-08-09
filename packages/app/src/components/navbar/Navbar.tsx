import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import app from '../../../../common/app.json'
import { Button } from '../button/Button'

export type NavigationItem = {
  name: string
  href: string
  isActive: boolean
}

type Props = {
  items: NavigationItem[]
  onClick?: (href: string) => void
}

export const Navbar = ({ items, onClick }: Props): ReactElement => {
  return (
    <ul className="mr-4 flex h-full flex-1 gap-x-2 overflow-x-auto lg:mr-8 lg:gap-x-4">
      {items.map(item => (
        <li key={item.name} className="h-full">
          <Button
            className={twMerge(
              item.isActive
                ? 'border-tremor-brand dark:border-dark-tremor-brand'
                : 'hover:border-tremor-border dark:hover:border-dark-tremor-border border-transparent',
              'h-full border-b-2',
            )}
            variant="light"
            onClick={() => {
              onClick && onClick(item.href)
            }}
            color={app.neutralColor}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  )
}
