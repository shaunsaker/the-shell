import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const Columns = ({
  className = '',
  children,
  ...props
}: Props): ReactElement => {
  return (
    <ul className={twMerge(className, 'lg:columns-3')} {...props}>
      {children}
    </ul>
  )
}
