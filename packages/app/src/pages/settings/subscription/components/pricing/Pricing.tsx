import { Metric, Text } from '@tremor/react'
import React, { ReactElement, useEffect, useState } from 'react'

import { RadioGroup } from '../../../../../components/radioGroup/RadioGroup'
import { useCreateCheckoutSession } from '../../../../../hooks/billing/useCreateCheckoutSession'
import { useProducts } from '../../../../../hooks/billing/useProducts'
import { parseProductMetadata } from '../../../../../utils/parseProductMetadata'
import { PricingCard } from './pricingCard/PricingCard'
import { ProductsNotFound } from './productsNotFound/ProductsNotFound'

const formatBillingInterval = (value: string): string => {
  switch (value) {
    case 'day':
      return 'Daily'
    case 'week':
      return 'Weekly'
    case 'month':
      return 'Monthly'
    case 'year':
      return 'Yearly'
    default:
      return ''
  }
}

export const Pricing = (): ReactElement => {
  const { data: products } = useProducts()
  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  // get the unique billing intervals from the prices
  const billingIntervals = Array.from(
    new Set(products?.flatMap(product => product?.prices?.map(price => price?.interval))),
  ).filter(Boolean)

  // Note: we set the billingInterval in a useEffect when the products and s
  const [billingInterval, setBillingInterval] = useState<string>('')

  // transform the billing interval into radio group options
  const billingIntervalValue = {
    label: formatBillingInterval(billingInterval),
    value: billingInterval,
  }
  const billingIntervalOptions = billingIntervals.map(billingInterval => ({
    label: formatBillingInterval(billingInterval),
    value: billingInterval,
  }))

  useEffect(
    () => {
      // when the products or subscription updates, set the billing interval
      if (products) {
        setBillingInterval(billingIntervals[0])
      }
    },
    // billingIntervals is excluded because it updates on every render and we don't want it to run this effect
    // eslint-disable-next-line
    [products],
  )

  if (!products?.length) {
    return <ProductsNotFound />
  }

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-lg text-center">
        <Text className="text-tremor-brand dark:text-dark-tremor-brand">Pricing</Text>

        <Metric className="mt-4">Pricing plans for teams of all sizes</Metric>

        <Text className="mt-4">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
          customer loyalty, and driving sales.
        </Text>
      </div>

      <RadioGroup
        className="mt-8"
        label="Select payment frequency"
        value={billingIntervalValue}
        options={billingIntervalOptions}
        onChange={option => setBillingInterval(option.value)}
      />

      <div className="mt-8 flex w-full flex-wrap gap-4 lg:flex-nowrap">
        {products
          // sort by lowest price to highest price
          ?.sort((productA, productB) => {
            // get the prices for the current billing interval
            const priceA = productA.prices?.filter(price => price.interval === billingInterval)[0]
            const priceB = productB.prices?.filter(price => price.interval === billingInterval)[0]

            return priceA?.unit_amount && priceB?.unit_amount && priceA?.unit_amount > priceB?.unit_amount ? 1 : -1
          })
          .map((product, index) => {
            // get the price for the current billing interval
            const price = product.prices?.filter(price => price.interval === billingInterval)[0]

            // highlight the second product
            const highlight = index === 1

            const { features, freeTrialDays } = parseProductMetadata(product.metadata)

            return (
              <PricingCard
                key={product.id}
                title={product.name || ''}
                description={product.description || ''}
                price={price?.unit_amount || 0}
                currency={price?.currency || ''}
                interval={price?.interval || ''}
                features={features}
                freeTrialDays={freeTrialDays}
                highlight={highlight}
                loading={createCheckoutSessionLoading}
                onClick={() => {
                  createCheckoutSession(price?.id || '')
                }}
              />
            )
          })}
      </div>
    </main>
  )
}
