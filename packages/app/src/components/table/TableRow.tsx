import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'tr'>

export const TableRow = ({ className = '', ...props }: Props): ReactElement => {
  return <tr className={twMerge('')} {...props} />
}
