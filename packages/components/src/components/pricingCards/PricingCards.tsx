import { RadioGroup } from 'components'
import React, { ComponentProps, ComponentPropsWithoutRef, ReactElement } from 'react'
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
  billingIntervalOptions = [],
  products,
  onBillingIntervalClick,
  onProductClick,
  ...props
}: Props): ReactElement => {
  return (
    <div className={twMerge('flex flex-col items-center', className)} {...props}>
      <RadioGroup
        className="mb-8"
        value={billingInterval}
        options={billingIntervalOptions}
        onValueChange={option => {
          onBillingIntervalClick(option.value)
        }}
      />

      <div className="w-full gap-4 lg:flex">
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
