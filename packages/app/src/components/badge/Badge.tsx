import { Badge as BadgePrimitive, BadgeProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = BadgeProps

export const Badge = ({ ...props }: Props): ReactElement => {
  return <BadgePrimitive {...props} />
}
