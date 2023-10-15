import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const Title = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h1
      className={twMerge(
        'text-theme-content-emphasis dark:text-dark-theme-content-emphasis font-display text-3xl tracking-tight lg:text-4xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
