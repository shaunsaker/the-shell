import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'a'>

export const AnchorText = ({ className = '', children, ...props }: Props) => {
  return (
    <a className={twMerge(className)} {...props}>
      {children}
    </a>
  )
}
