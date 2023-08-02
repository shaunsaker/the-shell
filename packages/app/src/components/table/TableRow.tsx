import { TableRow as TableRowPrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'

type Props = TableHTMLAttributes<HTMLTableRowElement>

export const TableRow = ({ ...props }: Props): ReactElement => {
  return <TableRowPrimitive {...props} />
}
