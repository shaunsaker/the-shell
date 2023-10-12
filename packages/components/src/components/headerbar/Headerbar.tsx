import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'header'>

export const Headerbar = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <header
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background flex h-16 w-full shrink-0 gap-x-2 px-4 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}
