import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const Columns = ({ className = '', children, ...props }: Props) => {
  return (
    <ul
      className={twMerge('mx-auto flex max-w-2xl flex-col gap-8 lg:grid lg:max-w-7xl lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </ul>
  )
}
