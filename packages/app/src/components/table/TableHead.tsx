import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'thead'>

export const TableHead = ({ className = '', ...props }: Props): ReactElement => {
  return <thead className={twMerge('')} {...props} />
}
