import { BarChart as BarChartPrimitive, BarChartProps } from '@tremor/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { COLORS } from '../../constants/colors'
import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'

type Props = BarChartProps & {
  title?: string
}

export const BarChart = ({ className = '', title, ...props }: Props) => {
  return (
    <Card className="cursor-default">
      {title && <HeadingText className="mb-4">{title}</HeadingText>}

      <BarChartPrimitive
        className={twMerge('font-sans text-xs', className)}
        colors={COLORS}
        showAnimation
        showGridLines={false}
        {...props}
      />
    </Card>
  )
}