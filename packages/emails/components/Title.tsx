import { Text } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TitleProps = {
  className?: string
  children?: ReactNode
}

export const Title = ({ className = '', children }: TitleProps): ReactElement => {
  return (
    <Text className={twMerge(`text-theme-content-emphasis m-0 mb-2 text-lg font-medium ${className}`)}>{children}</Text>
  )
}
