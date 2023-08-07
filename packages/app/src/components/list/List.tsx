import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const List = ({ className = '', children }: Props): ReactElement => {
  return (
    <ul className={twMerge('divide-y divide-tremor-border dark:divide-dark-tremor-border', className)}>{children}</ul>
  )
}

export { ListItem } from './ListItem'
