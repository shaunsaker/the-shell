import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import { useCreateCheckoutSession } from '../../../../../billing/hooks/useCreateCheckoutSession'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useProducts } from '../../../../../billing/hooks/useProducts'
import { RadioGroup } from '../../../../../components/radioGroup/RadioGroup'
import { Text } from '../../../../../components/text/Text'
import { Title } from '../../../../../components/title/Title'
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
  const { data: prices } = usePrices()
  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  // get the unique billing intervals from the prices
  const billingIntervals = useMemo(() => {
    if (!prices) {
      return []
    }

    return [...new Set(prices?.map(price => price.interval))]
  }, [prices])

  // Note: we set the billingInterval in a useEffect when the products and subscription updates
  const [billingInterval, setBillingInterval] = useState<string>('')

  // transform the billing interval into radio group options
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
    [billingIntervals, products],
  )

  if (!products?.length) {
    return <ProductsNotFound />
  }

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-lg text-center">
        <Text className="text-theme-brand dark:text-dark-theme-brand">Pricing</Text>

        <Title className="mt-4">Pricing plans for teams of all sizes</Title>

        <Text className="mt-4">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
          customer loyalty, and driving sales.
        </Text>
      </div>

      <RadioGroup
        className="mt-8"
        value={billingInterval}
        options={billingIntervalOptions}
        onValueChange={option => setBillingInterval(option.value)}
      />

      <div className="mt-8 flex w-full flex-wrap gap-4 lg:flex-nowrap">
        {products
          // sort by lowest price to highest price
          ?.sort((productA, productB) => {
            // get the prices for the current billing interval
            const priceA = prices?.filter(
              price => price.interval === billingInterval && price.productId === productA.id,
            )[0]
            const priceB = prices?.filter(
              price => price.interval === billingInterval && price.productId === productB.id,
            )[0]

            // sort by price
            return (priceA?.unitAmount || 0) - (priceB?.unitAmount || 0)
          })
          .map((product, index) => {
            // get the price for the current billing interval
            const price = prices?.filter(
              price => price.interval === billingInterval && price.productId === product.id,
            )[0]

            // highlight the second product
            const highlight = index === 1

            const { features, freeTrialDays } = parseProductMetadata(product.metadata)

            return (
              <PricingCard
                key={product.id}
                title={product.name || ''}
                description={product.description || ''}
                price={price?.unitAmount || 0}
                currency={price?.currency || ''}
                interval={price?.interval || ''}
                features={features}
                freeTrialDays={freeTrialDays}
                highlight={highlight}
                loading={createCheckoutSessionLoading}
                onClick={() => {
                  if (!price) {
                    return
                  }

                  createCheckoutSession({ priceId: price.id, quantity: 1 })
                }}
              />
            )
          })}
      </div>
    </main>
  )
}
