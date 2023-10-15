import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'p'>

export const ParagraphText = ({ className = '', children, ...props }: Props): ReactElement => {
  return (
    <p className={twMerge('text-theme-content dark:text-dark-theme-content text-md lg:text-lg', className)} {...props}>
      {children}
    </p>
  )
}
