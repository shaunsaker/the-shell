import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h2'>

export const HeadingText = ({ className = '', children, ...props }: Props) => {
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
