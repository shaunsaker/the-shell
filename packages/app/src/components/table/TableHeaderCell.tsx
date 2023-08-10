import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'th'>

export const TableHeaderCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <th
      className={twMerge(
        'text-tremor-content dark:text-dark-tremor-content bg-tremor-background dark:bg-dark-tremor-background sticky top-0 whitespace-nowrap px-4 py-3.5 text-left text-sm font-semibold',
      )}
      {...props}
    />
  )
}
