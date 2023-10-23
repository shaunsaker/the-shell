import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'p'>

export const ParagraphText = ({ className = '', children, ...props }: Props) => {
  return (
    <p className={twMerge(className)} {...props}>
      {children}
    </p>
  )
}
