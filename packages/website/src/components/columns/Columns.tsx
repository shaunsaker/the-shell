import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const Columns = ({ className = '', children, ...props }: Props) => {
  return (
    <ul className={twMerge(className, 'lg:columns-3')} {...props}>
      {children}
    </ul>
  )
}
