import { Table as TablePrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'

type Props = TableHTMLAttributes<HTMLTableElement>

export const Table = ({ ...props }: Props): ReactElement => {
  return <TablePrimitive {...props} />
}

export { TableBody } from './TableBody'
export { TableCell } from './TableCell'
export { TableHead } from './TableHead'
export { TableHeaderCell } from './TableHeaderCell'
export { TableRow } from './TableRow'
