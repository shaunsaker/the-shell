import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'label'>

export const Label = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <label
      className={twMerge('text-theme-content dark:text-dark-theme-content text-sm font-normal', className)}
      {...props}
    >
      {children}
    </label>
  )
}
