import { Text as TextPrimitive, TextProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = TextProps

export const Text = ({ ...props }: Props): ReactElement => {
  return <TextPrimitive {...props} />
}
