import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { SmallText } from '../smallText/SmallText'

type NumberListItemProps = ComponentPropsWithoutRef<'li'> & { number: number }

const NumberedListItem = ({ className = '', number, children, ...props }: NumberListItemProps) => {
  return (
    <li className={twMerge(`flex gap-x-4`, className)} {...props}>
      <SmallText>{number}.</SmallText>

      <SmallText>{children}</SmallText>
    </li>
  )
}

type Props = ComponentPropsWithoutRef<'ol'>

const NumberedList = ({ className = '', children, ...props }: Props) => {
  return (
    <ol className={twMerge('flex flex-col gap-y-2', className)} {...props}>
      {children}
    </ol>
  )
}

NumberedList.Item = NumberedListItem

export { NumberedList }
