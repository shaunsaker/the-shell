import { Button as ButtonPrimitive } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  className?: string
  href?: string
  children?: ReactNode
}

export const Button = ({ className = '', href, children }: ButtonProps): ReactElement => {
  return (
    <ButtonPrimitive
      className={twMerge(
        `cursor-pointer rounded-lg border bg-tremor-brand px-4 py-2 my-8 text-sm font-medium text-tremor-brand-inverted shadow-sm ${className}`,
      )}
      href={href}
    >
      {children}
    </ButtonPrimitive>
  )
}
