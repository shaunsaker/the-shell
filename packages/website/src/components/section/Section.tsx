import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'section'>

export const Section = ({ className = '', children, ...props }: Props) => {
  return (
    // 63px is the height of the Header
    // 95px is the height of the Header + pt-12
    <section className={twMerge('px-4 sm:px-8 py-12 lg:px-16 lg:py-24 pt-[95px] lg:pt-[63px]', className)} {...props}>
      {children}
    </section>
  )
}
