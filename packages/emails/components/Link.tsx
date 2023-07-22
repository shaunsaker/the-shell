import { Link as LinkPrimitive } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkProps = {
  className?: string
  href?: string
  children?: ReactNode
}

export const Link = ({ className = '', href = '', children }: LinkProps): ReactElement => {
  return (
    <LinkPrimitive className={twMerge(`m-0 text-sm text-tremor-brand underline ${className}`)} href={href}>
      {children}
    </LinkPrimitive>
  )
}
