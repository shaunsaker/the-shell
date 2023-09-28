import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import { useCreateCheckoutSession } from '../../../../../billing/hooks/useCreateCheckoutSession'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useProducts } from '../../../../../billing/hooks/useProducts'
import { RadioGroup } from '../../../../../components/radioGroup/RadioGroup'
import { Text } from '../../../../../components/text/Text'
import { Title } from '../../../../../components/title/Title'
import { formatBillingInterval } from '../../../../../utils/formatBillingInterval'
import { parseProductMetadata } from '../../../../../utils/parseProductMetadata'
import { sortProductsByPrice } from '../../../../../utils/sortProductsByPrice'
import { PricingCard } from './pricingCard/PricingCard'
import { ProductsNotFound } from './productsNotFound/ProductsNotFound'

export const Pricing = (): ReactElement => {
  const { data: products } = useProducts()
  const { data: prices } = usePrices()
  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  // Note: we set the billingInterval in a useEffect when the prices updates
  const [billingInterval, setBillingInterval] = useState<string>('')
  const [billingIntervalOptions, setBillingIntervalOptions] = useState<{ label: string; value: string }[]>([])

  // filter the prices by the selected billing interval
  const pricesForBillingInterval = useMemo(
    () => prices?.filter(price => price.interval === billingInterval),
    [billingInterval, prices],
  )

  const sortedProducts = useMemo(
    () => sortProductsByPrice({ products, prices: pricesForBillingInterval }),
    [pricesForBillingInterval, products],
  )

  useEffect(() => {
    // when the prices update, set the selected billing interval and billing interval options
    if (prices?.length) {
      // console.log('HERE 2')
      // get the unique billing intervals from the prices
      const billingIntervalOptions = [...new Set(prices?.map(price => price.interval))].map(billingInterval => ({
        label: formatBillingInterval(billingInterval),
        value: billingInterval,
      }))

      setBillingIntervalOptions(billingIntervalOptions)

      // set the selected billing interval to the first one
      setBillingInterval(billingIntervalOptions[0].value)
      // console.log('HERE 3')
    }
  }, [prices])

  if (!products?.length || !prices?.length) {
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
        {sortedProducts.map((product, index) => {
          // get the price for the current billing interval
          const price = pricesForBillingInterval?.filter(price => price.productId === product.id)[0]

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
