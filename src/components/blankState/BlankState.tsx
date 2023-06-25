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
    <div className="flex flex-1 flex-col items-center justify-center">
      <Icon className="h-8 w-8 text-gray-400" />

      <Title className="mt-2">{title}</Title>

      <Text>{description}</Text>

      <Button className="mt-4" onClick={buttonAction}>
        {buttonText}
      </Button>
    </div>
  )
}
