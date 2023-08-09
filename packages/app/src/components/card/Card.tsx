import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLDivElement>

export const Card = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-tremor-background dark:bg-dark-tremor-background w-full rounded-lg border p-6 shadow',
        className,
      )}
      {...props}
    />
  )
}
