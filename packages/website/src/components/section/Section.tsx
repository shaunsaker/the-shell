import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'section'>

export const Section = ({
  className = '',
  children,
  ...props
}: Props): ReactElement => {
  return (
    <section className={twMerge('px-8 py-24 lg:px-16', className)} {...props}>
      {children}
    </section>
  )
}
