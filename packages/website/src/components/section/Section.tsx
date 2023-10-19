import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'section'>

export const Section = ({ className = '', children, ...props }: Props) => {
  return (
    <section className={twMerge('px-8 py-12 lg:px-16 lg:py-24', className)} {...props}>
      {children}
    </section>
  )
}
