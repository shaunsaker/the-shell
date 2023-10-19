import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type Props = ComponentPropsWithoutRef<'div'>

export const Badge = ({ className = '', children, ...props }: Props) => {
  return (
    <div
      {...props}
      className={twMerge(
        'bg-theme-brand-muted dark:bg-dark-theme-brand-muted flex items-center rounded-full px-2 py-0.5',
        className,
      )}
    >
      <Text className="text-theme-brand-emphasis dark:text-dark-theme-brand-emphasis text-xs">{children}</Text>
    </div>
  )
}
