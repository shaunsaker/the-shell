import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLHeadingElement>

export const Heading = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <h2 className={twMerge('font-medium text-lg text-tremor-content-emphasis', className)} {...props}>
      {children}
    </h2>
  )
}
