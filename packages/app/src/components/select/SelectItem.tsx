import { SelectItem as SelectItemPrimitive, SelectItemProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = SelectItemProps

export const SelectItem = ({ ...props }: Props): ReactElement => {
  return <SelectItemPrimitive {...props} />
}
