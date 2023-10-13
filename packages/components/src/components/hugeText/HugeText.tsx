import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const HugeText = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h1
      className={twMerge(
        'text-theme-content-emphasis dark:text-dark-theme-content-emphasis text-4xl font-semibold lg:text-6xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
