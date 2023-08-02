import { Select as SelectPrimitive, SelectProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = SelectProps

export const Select = ({ ...props }: Props): ReactElement => {
  return <SelectPrimitive {...props} />
}

export { SelectItem } from './SelectItem'
