import React, { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef(({ className = '', ...props }: Props, ref: any): ReactElement => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border w-full rounded-lg border p-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
})
