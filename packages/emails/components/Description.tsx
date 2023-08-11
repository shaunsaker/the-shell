import { Text } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type DescriptionProps = {
  className?: string
  children?: ReactNode
}

export const Description = ({ className = '', children }: DescriptionProps): ReactElement => {
  return <Text className={twMerge(`text-theme-content m-0 text-sm ${className}`)}>{children}</Text>
}
