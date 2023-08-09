import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'td'>

export const TableCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <td
      className={twMerge(
        'text-tremor-content dark:text-dark-tremor-content whitespace-nowrap p-4 text-left align-middle text-sm',
      )}
      {...props}
    />
  )
}
