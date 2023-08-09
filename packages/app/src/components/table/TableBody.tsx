import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'tbody'>

export const TableBody = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <tbody
      className={twMerge('divide-tremor-border dark:divide-dark-tremor-border divide-y overflow-x-auto')}
      {...props}
    />
  )
}
