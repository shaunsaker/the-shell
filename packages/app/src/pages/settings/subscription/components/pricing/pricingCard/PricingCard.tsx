import { CheckIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Badge } from '../../../../../../components/badge/Badge'
import { Button } from '../../../../../../components/button/Button'
import { Card } from '../../../../../../components/card/Card'
import { Heading } from '../../../../../../components/heading/Heading'
import { Text } from '../../../../../../components/text/Text'
import { Title } from '../../../../../../components/title/Title'
import { formatCurrency } from '../../../../../../utils/formatCurrency'

type PricingCardProps = {
  title: string
  description: string
  price: number
  currency: string
  interval: string
  features: string[]
  freeTrialDays?: number
  highlight: boolean
  loading: boolean
  onClick: () => void
}

export const PricingCard = ({
  title,
  description,
  price,
  currency,
  interval,
  features,
  freeTrialDays,
  highlight,
  loading,
  onClick,
}: PricingCardProps): ReactElement => {
  return (
    <Card
      className={twMerge(
        highlight ? 'ring ring-tremor-brand dark:ring-tremor-brand' : '',
        'mx-auto flex max-w-lg flex-col gap-y-4',
      )}
    >
      <div className="flex justify-between gap-x-4">
        <Heading className={highlight ? 'text-tremor-brand dark:text-tremor-brand' : ''}>{title}</Heading>

        {highlight && <Badge size="xs">Most popular</Badge>}
      </div>

      <Text>{description}</Text>

      <div className="flex items-end">
        <Title>{currency && formatCurrency(price / 100, currency)}</Title>

        <Text className="mb-1 ml-1">/ {interval}</Text>
      </div>

      <Button variant={highlight ? 'primary' : 'secondary'} disabled={loading} loading={loading} onClick={onClick}>
        {freeTrialDays ? `Start ${freeTrialDays} day free trial` : 'Buy plan'}
      </Button>

      <ul className="flex flex-col gap-y-2">
        {features.map(feature => (
          <li key={feature} className="flex items-center gap-x-2">
            <CheckIcon className="h-4 w-4 text-tremor-brand dark:text-dark-tremor-brand" />

            <Text>{feature}</Text>
          </li>
        ))}
      </ul>
    </Card>
  )
}
