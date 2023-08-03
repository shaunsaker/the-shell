import { Metric as MetricPrimitive, MetricProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = MetricProps

export const Title = ({ ...props }: Props): ReactElement => {
  return <MetricPrimitive {...props} />
}
