import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'p'>

export const SmallText = ({ className = '', children, ...props }: Props) => {
  return (
    <small className={twMerge(className)} {...props}>
      {children}
    </small>
  )
}
