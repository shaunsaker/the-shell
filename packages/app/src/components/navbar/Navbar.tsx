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
    <ul className="mr-4 lg:mr-8 flex h-full flex-1 gap-x-2 lg:gap-x-4 overflow-x-auto">
      {items.map(item => (
        <li key={item.name} className="h-full">
          <Button
            className={twMerge(
              item.isActive
                ? 'border-tremor-brand dark:border-dark-tremor-brand'
                : 'border-transparent hover:border-tremor-border dark:hover:border-dark-tremor-border',
              'inline-flex h-full items-center border-b-2 px-1 pt-1',
            )}
            variant="light"
            onClick={() => {
              onClick && onClick(item.href)
            }}
            // @ts-expect-error FIXME: types and this usage sucks
            color={app.neutralColor}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  )
}
