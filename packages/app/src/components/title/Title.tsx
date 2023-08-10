import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLHeadingElement>

export const Title = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h1
      className={twMerge(
        'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-3xl font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
