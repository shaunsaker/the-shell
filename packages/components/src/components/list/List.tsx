import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { SmallText } from '../smallText/SmallText'

type ListItemProps = ComponentPropsWithoutRef<'li'>

const ListItem = ({ className = '', children }: ListItemProps) => {
  return (
    <li className={twMerge('py-2', className)}>
      <SmallText className="flex justify-between">{children}</SmallText>
    </li>
  )
}

type Props = ComponentPropsWithoutRef<'ul'>

const List = ({ className = '', children }: Props) => {
  return (
    <ul className={twMerge('divide-theme-border dark:divide-dark-theme-border divide-y', className)}>{children}</ul>
  )
}

List.Item = ListItem

export { List }
