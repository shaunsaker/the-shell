import { CheckIcon } from '@heroicons/react/24/outline'
import { Badge, Button, Card, HeadingText, SmallText, TitleText } from 'components'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { PricingCardProduct } from 'types'

import { formatCurrency } from '../../utils/formatCurrency'

type PricingCardProps = {
  onClick: () => void
} & PricingCardProduct

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
        'mx-auto flex h-full max-w-lg flex-col gap-y-4',
      )}
    >
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2">
        <HeadingText className={highlight ? 'text-theme-brand dark:text-theme-brand' : ''}>{title}</HeadingText>

        {highlight && <Badge>Most popular</Badge>}
      </div>

      <SmallText>{description}</SmallText>

      <div className="flex items-end">
        <TitleText>{currency && formatCurrency(price / 100, currency)}</TitleText>

        <SmallText className="mb-1 ml-1">/ {interval}</SmallText>
      </div>

      <Button variant={highlight ? 'primary' : 'secondary'} disabled={loading} loading={loading} onClick={onClick}>
        {freeTrialDays ? `Start ${freeTrialDays} day free trial` : 'Buy plan'}
      </Button>

      <ul className="flex flex-col gap-y-2">
        {features.map(feature => (
          <li key={feature} className="flex items-center gap-x-2">
            <CheckIcon className="text-theme-brand dark:text-dark-theme-brand h-4 w-4" />

            <SmallText>{feature}</SmallText>
          </li>
        ))}
      </ul>
    </Card>
  )
}
