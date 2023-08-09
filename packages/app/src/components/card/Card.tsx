import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLDivElement>

export const Card = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'p-6 rounded-lg shadow border bg-tremor-background dark:bg-dark-tremor-background w-full',
        className,
      )}
      {...props}
    />
  )
}
