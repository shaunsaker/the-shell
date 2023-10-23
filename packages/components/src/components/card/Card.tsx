import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef(({ className = '', ...props }: Props, ref: any) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border hover:bg-theme-background-muted dark:hover:bg-dark-theme-background-muted w-full cursor-pointer rounded-2xl border p-6 shadow-lg',
        className,
      )}
      {...props}
    />
  )
})
