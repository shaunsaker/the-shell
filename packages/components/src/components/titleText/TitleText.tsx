import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const TitleText = ({ className = '', children, ...props }: Props) => {
  return (
    <h2 className={twMerge(className)} {...props}>
      {children}
    </h2>
  )
}
