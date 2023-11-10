import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'label'>

// TODO: SS style in global styles
export const LabelText = ({ className = '', children, ...props }: Props) => {
  return (
    <label className={twMerge('whitespace-nowrap text-sm font-normal', className)} {...props}>
      {children}
    </label>
  )
}
