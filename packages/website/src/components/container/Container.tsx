import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Container = ({ className = '', children, ...props }: Props) => {
  return (
    <div
      className={twMerge(className, 'relative mx-auto flex max-w-2xl flex-col items-center gap-y-6 text-center')}
      {...props}
    >
      {children}
    </div>
  )
}
