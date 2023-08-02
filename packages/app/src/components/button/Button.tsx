import { Button as ButtonPrimitive, ButtonProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = ButtonProps

export const Button = ({ ...props }: Props): ReactElement => {
  return <ButtonPrimitive {...props} />
}
