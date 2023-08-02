import { TableBody as TableBodyPrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'

type Props = TableHTMLAttributes<HTMLTableSectionElement>

export const TableBody = ({ ...props }: Props): ReactElement => {
  return <TableBodyPrimitive {...props} />
}
