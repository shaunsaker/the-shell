import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type Props = ComponentPropsWithoutRef<'li'>

export const ListItem = ({ className = '', children }: Props) => {
  return (
    <li className={twMerge('py-2', className)}>
      <Text className="flex justify-between">{children}</Text>
    </li>
  )
}
