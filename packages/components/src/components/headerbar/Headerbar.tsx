import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'header'>

export const Headerbar = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <header
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border flex h-16 w-full shrink-0 gap-x-2 border-b px-4 shadow-sm lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}
