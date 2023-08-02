import { Metric as MetricPrimitive, MetricProps } from '@tremor/react'
import React, { ReactElement } from 'react'

type Props = MetricProps

export const Metric = ({ ...props }: Props): ReactElement => {
  return <MetricPrimitive {...props} />
}
