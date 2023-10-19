import { CheckIcon } from '@heroicons/react/24/outline'
import { Badge, Button, Card, HeadingText, Text, Title } from 'components'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { formatCurrency } from '../../utils/formatCurrency'

export type Product = {
  id: string
  title: string
  description: string
  currency: string
  price: number
  interval: string
  features: string[]
  freeTrialDays?: number
  highlight?: boolean
  loading?: boolean
}

type PricingCardProps = {
  onClick: () => void
} & Product

export const PricingCard = ({
  title,
  description,
  currency,
  price,
  interval,
  features,
  freeTrialDays,
  highlight,
  loading,
  onClick,
}: PricingCardProps) => {
  return (
    <Card
      className={twMerge(
        highlight ? 'ring-theme-brand dark:ring-theme-brand ring' : '',
        'mx-auto flex max-w-lg flex-col gap-y-4',
      )}
    >
      <div className="flex justify-between gap-x-4">
        <HeadingText className={highlight ? 'text-theme-brand dark:text-theme-brand' : ''}>{title}</HeadingText>

        {highlight && <Badge>Most popular</Badge>}
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
            <CheckIcon className="text-theme-brand dark:text-dark-theme-brand h-4 w-4" />

            <Text>{feature}</Text>
          </li>
        ))}
      </ul>
    </Card>
  )
}
