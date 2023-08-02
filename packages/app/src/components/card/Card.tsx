import { Card as CardPrimitive, CardProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = CardProps

export const Card = ({ ...props }: Props): ReactElement => {
  return <CardPrimitive {...props} />
}
