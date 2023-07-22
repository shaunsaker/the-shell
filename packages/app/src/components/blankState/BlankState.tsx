import { Button, Text, Title } from '@tremor/react'
import React, { ReactElement } from 'react'

type BlankStateProps = {
  Icon: any
  title: string
  description: string
  buttonText: string
  buttonAction: () => void
}

export const BlankState = ({ Icon, title, description, buttonText, buttonAction }: BlankStateProps): ReactElement => {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center">
      <Icon className="h-16 w-16 text-tremor-content-subtle dark:text-dark-tremor-content-subtle" />

      <Title className="mt-4">{title}</Title>

      <Text className="mt-2 text-center">{description}</Text>

      <Button className="mt-8" onClick={buttonAction}>
        {buttonText}
      </Button>
    </div>
  )
}
