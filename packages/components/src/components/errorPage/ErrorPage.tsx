import { Heading, Logo, SlimLayout, Text } from 'components'
import React, { ReactElement, ReactNode } from 'react'

type Props = {
  title: string
  description: string
  children?: ReactNode
}

export const ErrorPage = ({ title, description, children }: Props): ReactElement => {
  return (
    <SlimLayout>
      <div className="flex flex-col items-start gap-y-10">
        <Logo />

        <div className="flex flex-col gap-y-2">
          <Heading>{title}</Heading>

          <Text>{description}</Text>
        </div>

        {children}
      </div>
    </SlimLayout>
  )
}
