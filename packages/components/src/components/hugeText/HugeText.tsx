import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const HugeText = ({ className = '', children, ...props }: Props) => {
  return (
    <h1 className={twMerge(className)} {...props}>
      {children}
    </h1>
  )
}
