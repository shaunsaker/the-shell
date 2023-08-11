import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border w-full rounded-lg border p-6 shadow',
        className,
      )}
      {...props}
    />
  )
}
