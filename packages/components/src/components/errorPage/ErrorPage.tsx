import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, Heading, Logo, SlimLayout, Text } from 'components'
import React, { ReactElement } from 'react'

type Props = {
  title: string
  description: string
  onGoHomeClick: () => void
  onContactSupportClick: () => void
}

export const ErrorPage = ({ title, description, onGoHomeClick, onContactSupportClick }: Props): ReactElement => {
  return (
    <SlimLayout>
      <div className="flex flex-col items-start gap-y-10">
        <Logo />

        <div className="flex flex-col gap-y-2">
          <Heading>{title}</Heading>

          <Text>{description}</Text>
        </div>

        <div className="flex gap-x-8">
          <Button onClick={onGoHomeClick}>Go back home</Button>

          <Button variant="light" icon={<ArrowRightIcon />} iconPosition="right" onClick={onContactSupportClick}>
            Contact support
          </Button>
        </div>
      </div>
    </SlimLayout>
  )
}
