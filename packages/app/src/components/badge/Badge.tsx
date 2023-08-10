import React, { ComponentPropsWithoutRef, ReactElement } from 'react'

import { Text } from '../text/Text'

type Props = ComponentPropsWithoutRef<'div'>

export const Badge = ({ children, ...props }: Props): ReactElement => {
  return (
    <div className="bg-tremor-brand-muted dark:bg-dark-tremor-brand-muted rounded-full px-2 py-0.5">
      <Text className="text-tremor-brand-emphasis dark:text-dark-tremor-brand-emphasis text-xs">{children}</Text>
    </div>
  )
}
