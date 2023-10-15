import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h2'>

export const Heading = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h2
      className={twMerge(
        'text-theme-content-emphasis dark:text-dark-theme-content-emphasis text-md font-display font-semibold lg:text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
