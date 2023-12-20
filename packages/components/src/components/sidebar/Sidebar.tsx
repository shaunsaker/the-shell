import { ReactNode } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, ButtonProps } from '../button/Button'
import { Logo } from '../logo/Logo'

type SidebarItemProps = {
  active?: boolean
} & ButtonProps

const SidebarItem = ({ active, ...props }: SidebarItemProps) => {
  return (
    <Button
      variant="lightInverted"
      className={twMerge(
        'w-full justify-start',
        active ? 'bg-theme-brand-inverted/10 dark:bg-dark-theme-brand-inverted/10' : '',
      )}
      {...props}
    />
  )
}

type Props = {
  children?: ReactNode
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="bg-theme-brand dark:bg-dark-theme-brand flex w-64 flex-1 flex-col gap-y-6 overflow-y-auto p-6">
      <div className="flex items-center">
        <Logo className="text-theme-content-inverted fill-theme-content-inverted dark:fill-dark-theme-content-inverted dark:text-dark-theme-content-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-1 flex-col space-y-1">{children}</ul>
      </nav>
    </div>
  )
}

Sidebar.Item = SidebarItem

export { Sidebar }
