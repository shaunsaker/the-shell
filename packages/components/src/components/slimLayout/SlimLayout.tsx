import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const SlimLayout = ({ className, children, ...props }: Props) => {
  return (
    <div className={twMerge('relative flex min-h-full justify-center md:px-12 lg:px-0', className)} {...props}>
      <div className="bg-theme-background dark:bg-dark-theme-background relative z-10 flex flex-1 flex-col justify-center px-4 py-10 shadow-2xl md:flex-none md:px-28">
        <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">{children}</main>
      </div>

      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <div className="from-theme-brand-subtle dark:from-dark-theme-brand-subtle to-theme-brand-emphasis dark:to-dark-theme-brand-emphasis absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]" />
      </div>
    </div>
  )
}
