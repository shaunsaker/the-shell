import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const TitleText = ({ className = '', children, ...props }: Props) => {
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
