import React, { ReactElement, ReactNode } from 'react'

import { Heading } from '../heading/Heading'
import { Text } from '../text/Text'

type BlankStateProps = {
  Icon: any
  title: string
  description: string
  children: ReactNode
}

export const BlankState = ({ Icon, title, description, children }: BlankStateProps): ReactElement => {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-y-6">
      <Icon className="text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-16 w-16" />

      <div className="text-center">
        <Heading>{title}</Heading>

        <Text className="mt-1">{description}</Text>
      </div>

      {children}
    </div>
  )
}
