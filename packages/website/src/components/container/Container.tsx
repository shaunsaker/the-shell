import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Container = ({
  className = '',
  children,
  ...props
}: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        className,
        'relative mx-auto flex max-w-2xl flex-col items-center gap-y-6 text-center',
      )}
      {...props}
    >
      {children}
    </div>
  )
}
