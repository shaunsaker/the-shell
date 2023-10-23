import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h2'>

export const HeadingText = ({ className = '', children, ...props }: Props) => {
  return (
    <h3 className={twMerge(className)} {...props}>
      {children}
    </h3>
  )
}
