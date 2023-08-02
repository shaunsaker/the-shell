import { TableHead as TableHeadPrimitive } from '@tremor/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'

type Props = TableHTMLAttributes<HTMLTableSectionElement>

export const TableHead = ({ ...props }: Props): ReactElement => {
  return <TableHeadPrimitive {...props} />
}
