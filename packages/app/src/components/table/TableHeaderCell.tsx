import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'th'>

export const TableHeaderCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <th
      className={twMerge(
        'sticky whitespace-nowrap text-left font-semibold text-sm text-tremor-content dark:text-dark-tremor-content top-0 px-4 py-3.5 bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted',
      )}
      {...props}
    />
  )
}
