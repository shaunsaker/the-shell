import { Text } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TitleProps = {
  className?: string
  children?: ReactNode
}

export const Title = ({ className = '', children }: TitleProps): ReactElement => {
  return (
    <Text className={twMerge(`m-0 text-lg font-medium text-tremor-content-emphasis ${className}`)}>{children}</Text>
  )
}
