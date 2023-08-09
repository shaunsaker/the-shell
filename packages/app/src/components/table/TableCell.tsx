import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'td'>

export const TableCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <td
      className={twMerge(
        'align-middle whitespace-nowrap text-left p-4 text-tremor-content dark:text-dark-tremor-content text-sm',
      )}
      {...props}
    />
  )
}
