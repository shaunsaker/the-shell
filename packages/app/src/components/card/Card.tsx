import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-tremor-background dark:bg-dark-tremor-background border-tremor-border dark:border-dark-tremor-border w-full rounded-lg border p-6 shadow',
        className,
      )}
      {...props}
    />
  )
}
