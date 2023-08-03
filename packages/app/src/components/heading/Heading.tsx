import { Title as TitlePrimitive, TitleProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = TitleProps

export const Heading = ({ ...props }: Props): ReactElement => {
  return <TitlePrimitive {...props} />
}
