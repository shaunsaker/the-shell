import { TableHeaderCell as TableHeaderCellPrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = TableHTMLAttributes<HTMLTableCellElement>

export const TableHeaderCell = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <TableHeaderCellPrimitive
      className={twMerge('bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted', className)}
      {...props}
    />
  )
}
