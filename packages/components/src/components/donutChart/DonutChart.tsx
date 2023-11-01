import { DonutChart as DonutChartPrimitive, DonutChartProps } from '@tremor/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { COLORS } from '../../constants/colors'
import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'

type Props = DonutChartProps & {
  title?: string
}

export const DonutChart = ({ className = '', title, ...props }: Props) => {
  return (
    <Card className="cursor-default">
      {title && <HeadingText className="mb-4">{title}</HeadingText>}

      <DonutChartPrimitive
        className={twMerge('font-sans text-xs', className)}
        variant="pie"
        colors={COLORS}
        showAnimation
        {...props}
      />
    </Card>
  )
}
