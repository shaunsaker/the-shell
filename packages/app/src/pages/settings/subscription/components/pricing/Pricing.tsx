import { PricingCards, Text, Title } from 'components'
import React, { ComponentProps, ReactElement, useEffect, useMemo, useState } from 'react'

import { useCreateCheckoutSession } from '@/billing/hooks/useCreateCheckoutSession'
import { usePrices } from '@/billing/hooks/usePrices'
import { useProducts } from '@/billing/hooks/useProducts'
import { formatBillingInterval } from '@/utils/formatBillingInterval'
import { parseProductMetadata } from '@/utils/parseProductMetadata'
import { sortProductsByPrice } from '@/utils/sortProductsByPrice'

import { ProductsNotFound } from './productsNotFound/ProductsNotFound'

const DEFAULT_QUANTITY = 1

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]
type BillingIntervalValue = BillingIntervalOption['value']

export const Pricing = (): ReactElement => {
  const { data: products } = useProducts()
  const { data: prices } = usePrices()
  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  // Note: we set the billingInterval in a useEffect when the prices updates
  const [billingInterval, setBillingInterval] = useState<BillingIntervalValue>('')
  const [billingIntervalOptions, setBillingIntervalOptions] = useState<BillingIntervalOption[]>([])

  // filter the prices by the selected billing interval
  const pricesForBillingInterval = useMemo(
    () => prices?.filter(price => price.interval === billingInterval),
    [billingInterval, prices],
  )

  const pricingCardsProducts = useMemo(() => {
    if (!pricesForBillingInterval?.length) {
      return []
    }

    const sortedProducts = sortProductsByPrice({ products, prices: pricesForBillingInterval })
    const pricingCardsProducts = sortedProducts.map((product, index) => {
      // get the price for the current billing interval
      const price = pricesForBillingInterval?.filter(price => price.productId === product.id)[0]

      // highlight the second product
      const highlight = index === 1

      const { features, freeTrialDays } = parseProductMetadata(product.metadata)

      return {
        id: price?.id || '',
        title: product.name,
        description: product.description,
        currency: price?.currency || '',
        price: price?.unitAmount || 0,
        interval: price?.interval || '',
        features,
        freeTrialDays,
        highlight,
        loading: createCheckoutSessionLoading,
      }
    })

    return pricingCardsProducts
  }, [createCheckoutSessionLoading, pricesForBillingInterval, products])

  useEffect(() => {
    // when the prices update, set the selected billing interval and billing interval options
    if (prices?.length) {
      // get the unique billing intervals from the prices
      const billingIntervalOptions = [...new Set(prices?.map(price => price.interval))].map(billingInterval => ({
        label: formatBillingInterval(billingInterval),
        value: billingInterval,
      }))

      setBillingIntervalOptions(billingIntervalOptions)

      // set the selected billing interval to the first one
      setBillingInterval(billingIntervalOptions[0].value)
    }
  }, [prices])

  if (!products?.length || !prices?.length) {
    return <ProductsNotFound />
  }

  return (
    <main className="flex flex-col items-center">
      <div className="mb-8 w-full max-w-lg text-center">
        <Title className="mt-4">Pricing plans for teams of all sizes</Title>

        <Text className="mt-4">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
          customer loyalty, and driving sales.
        </Text>
      </div>

      <PricingCards
        billingInterval={billingInterval}
        billingIntervalOptions={billingIntervalOptions}
        products={pricingCardsProducts}
        onBillingIntervalClick={newBillingIntervalValue => {
          setBillingInterval(newBillingIntervalValue)
        }}
        onProductClick={id => {
          createCheckoutSession({ priceId: id, quantity: DEFAULT_QUANTITY })
        }}
      />
    </main>
  )
}
