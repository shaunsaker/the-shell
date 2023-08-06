import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLHeadingElement>

export const Title = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h1 className={twMerge('font-semibold text-3xl text-tremor-content-emphasis', className)} {...props}>
      {children}
    </h1>
  )
}
