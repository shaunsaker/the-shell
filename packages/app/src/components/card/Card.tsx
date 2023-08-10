import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLDivElement>

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
