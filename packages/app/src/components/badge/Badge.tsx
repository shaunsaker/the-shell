import React, { ComponentPropsWithoutRef, ReactElement } from 'react'

import { Text } from '../text/Text'

type Props = ComponentPropsWithoutRef<'div'>

export const Badge = ({ children, ...props }: Props): ReactElement => {
  return (
    <div className="bg-theme-brand-muted dark:bg-dark-theme-brand-muted rounded-full px-2 py-0.5">
      <Text className="text-theme-brand-emphasis dark:text-dark-theme-brand-emphasis text-xs">{children}</Text>
    </div>
  )
}
