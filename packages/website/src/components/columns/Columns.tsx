import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const Columns = ({ className = '', children, ...props }: Props) => {
  return (
    <ul className={twMerge('max-w-2xl mx-auto lg:max-w-none lg:grid lg:gap-8 lg:grid-cols-3', className)} {...props}>
      {children}
    </ul>
  )
}
