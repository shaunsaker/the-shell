import { RadioGroup } from 'components'
import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { PricingCard, Product } from './PricingCard'

type BillingIntervalOption = ComponentProps<typeof RadioGroup>['options'][0]
type BillingIntervalValue = BillingIntervalOption['value']

type Props = {
  billingInterval: BillingIntervalValue
  billingIntervalOptions: BillingIntervalOption[]
  products: Product[]
  onBillingIntervalClick: (value: BillingIntervalValue) => void
  onProductClick: (productId: Product['id']) => void
} & ComponentPropsWithoutRef<'div'>

export const PricingCards = ({
  className = '',
  billingInterval,
  billingIntervalOptions,
  products,
  onBillingIntervalClick,
  onProductClick,
  ...props
}: Props) => {
  if (!products.length) {
    return null
  }

  return (
    <div className={twMerge('flex flex-col items-center', className)} {...props}>
      {billingIntervalOptions.length ? (
        <RadioGroup
          className="mb-8"
          value={billingInterval}
          options={billingIntervalOptions}
          onValueChange={option => {
            onBillingIntervalClick(option.value)
          }}
        />
      ) : null}

      <div className="flex w-full flex-col gap-x-6 gap-y-8 overflow-x-auto pb-2 lg:flex-row">
        {products?.map(product => {
          return (
            <PricingCard
              key={product.id}
              {...product}
              onClick={() => {
                onProductClick(product.id)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
