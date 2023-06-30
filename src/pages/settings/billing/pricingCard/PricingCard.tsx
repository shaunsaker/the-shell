import { CheckIcon } from '@heroicons/react/24/outline'
import { Badge, Card, Metric, Text, Title } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type PricingCardProps = {
  title: string
  description: string
  price: number
  currency: string
  interval: string
  features: string[]
  highlight: boolean
  active: boolean
  children: ReactNode
}

export const PricingCard = ({
  title,
  description,
  price,
  currency,
  interval,
  features,
  highlight,
  active,
  children,
}: PricingCardProps): ReactElement => {
  return (
    <Card
      className={twMerge(
        highlight ? 'ring ring-tremor-brand dark:ring-tremor-brand' : '',
        'mx-auto flex max-w-lg flex-col gap-y-4'
      )}
    >
      <div className="flex justify-between gap-x-4">
        <Title className={highlight ? 'text-tremor-brand dark:text-tremor-brand' : ''}>{title}</Title>

        {highlight && <Badge size="xs">{active ? 'Current plan' : 'Most popular'}</Badge>}
      </div>

      <Text>{description}</Text>

      <div className="flex items-end">
        <Metric>
          {currency &&
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
              minimumFractionDigits: 0,
            }).format(price / 100)}
        </Metric>

        <Text className="mb-1 ml-1">/ {interval}</Text>
      </div>

      {children}

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
