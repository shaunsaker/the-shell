import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'td'>

export const TableCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <td
      className={twMerge(
        'text-theme-content dark:text-dark-theme-content whitespace-nowrap p-4 text-left align-middle text-sm',
      )}
      {...props}
    />
  )
}
