import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h2'>

export const Heading = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h2
      className={twMerge(
        'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-lg font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
