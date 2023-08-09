import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'table'>

export const Table = ({ className = '', ...props }: Props): ReactElement => {
  return <table className={twMerge('w-full')} {...props} />
}

export { TableBody } from './TableBody'
export { TableCell } from './TableCell'
export { TableHead } from './TableHead'
export { TableHeaderCell } from './TableHeaderCell'
export { TableRow } from './TableRow'
