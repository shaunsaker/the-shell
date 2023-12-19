import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, ButtonProps } from '../button/Button'

type NavbarItemProps = {
  active?: boolean
} & ButtonProps

const NavbarItem = ({ active, ...props }: NavbarItemProps) => {
  return (
    <Button
      className={twMerge(
        active
          ? 'border-theme-brand dark:border-dark-theme-brand'
          : 'hover:border-theme-border dark:hover:border-dark-theme-border',
        'h-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 hover:bg-inherit',
      )}
      variant="lightNeutral"
      {...props}
    />
  )
}

type Props = ComponentPropsWithoutRef<'ul'>

const Navbar = ({ className = '', ...props }: Props) => {
  return <ul className={twMerge(`flex w-full gap-x-2 overflow-x-auto lg:gap-x-4`, className)} {...props} />
}

Navbar.Item = NavbarItem

export { Navbar }
