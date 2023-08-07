import React, { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLParagraphElement>

export const Text = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <p
      className={twMerge('font-normal text-sm text-tremor-content dark:text-dark-tremor-content', className)}
      {...props}
    >
      {children}
    </p>
  )
}
