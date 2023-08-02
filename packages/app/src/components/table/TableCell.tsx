import { TableCell as TableCellPrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'

type Props = TableHTMLAttributes<HTMLTableCellElement>

export const TableCell = ({ ...props }: Props): ReactElement => {
  return <TableCellPrimitive {...props} />
}
