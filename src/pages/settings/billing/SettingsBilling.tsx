import { Badge, Button, Metric, Text } from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { createBillingPortalSession } from '../../../api/billing/createBillingPortalSession'
import { createCheckoutSession } from '../../../api/billing/createCheckoutSession'
import { RadioGroup } from '../../../components/radioGroup/RadioGroup'
import { SkeletonLoader } from '../../../components/skeletonLoader/SkeletonLoader'
import { useSession } from '../../../hooks/auth/useSession'
import { useProducts } from '../../../hooks/products/useProducts'
import { useSubscriptions } from '../../../hooks/subscriptions/useSubscriptions'
import { useLink } from '../../../hooks/utils/useLink'
import { PricingCard } from './pricingCard/PricingCard'

const billingIntervalValueToLabel = (value: string): string => {
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

export const SettingsBilling = (): ReactElement => {
  const { data: session, isLoading: sessionLoading } = useSession()
  const { data: subscriptions, isLoading: subscriptionsLoading } = useSubscriptions()
  const { data: products, isLoading: productsLoading } = useProducts()
  const [stripeLoading, setStripeLoading] = useState(false)
  const link = useLink()

  const loading = sessionLoading || subscriptionsLoading || productsLoading

  // get the latest subscription, if it exists
  const subscription = subscriptions && subscriptions[0]

  // find the active product
  const activeProduct = products?.filter(product =>
    product.prices.some(price => price.id === subscription?.price_id)
  )[0]
  const activePrice = activeProduct?.prices?.filter(price => price.id === subscription?.price_id)?.[0]

  // get the unique billing intervals from the prices
  const billingIntervals = Array.from(
    new Set(products?.flatMap(product => product?.prices?.map(price => price?.interval)))
  ).filter(Boolean)

  // Note: we set the billingInterval in a useEffect when the products and s
  const [billingInterval, setBillingInterval] = React.useState<string>('')

  // transform the billing interval into radio group options
  const billingIntervalValue = { label: billingIntervalValueToLabel(billingInterval), value: billingInterval }
  const billingIntervalOptions = billingIntervals.map(billingInterval => ({
    label: billingIntervalValueToLabel(billingInterval),
    value: billingInterval,
  }))

  useEffect(
    () => {
      // when the products or subscription updates, set the billing interval
      if (products) {
        setBillingInterval(activePrice?.interval || billingIntervals[0])
      }
    },
    // billingIntervals is excluded because it updates on every render and we don't want it to run this effect
    // eslint-disable-next-line
    [activePrice?.interval, products]
  )

  const onPricingCardClick = useCallback(
    async (priceId: string) => {
      if (!session?.user) throw new Error('User is not authenticated!')

      setStripeLoading(true)

      if (subscription) {
        try {
          // TODO: SS move to mutation
          const portalSession = await createBillingPortalSession()

          if (!portalSession.url) {
            throw new Error("Couldn't create a billing portal session")
          }

          link(portalSession.url, '_self')
        } catch (error) {
          toast.error((error as Error).message)
        }
      } else {
        try {
          // TODO: SS move to mutation
          const checkoutSession = await createCheckoutSession(priceId)

          if (!checkoutSession.url) {
            throw new Error("Couldn't create a checkout session")
          }

          link(checkoutSession.url, '_self')
        } catch (error) {
          toast.error((error as Error).message)
        }
      }

      setStripeLoading(false)
    },
    [link, session?.user, subscription]
  )

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-lg text-center">
        <Text className="text-tremor-brand dark:text-dark-tremor-brand">Pricing</Text>

        <Metric className="mt-4">{subscription ? 'Manage your plan' : 'Pricing plans for teams of all sizes'}</Metric>

        <div className="mt-6">
          {subscription ? (
            <div className="flex justify-center gap-x-4">
              <Badge color="gray">Last payment {dayjs(subscription.current_period_start).format('DD MMMM YYYY')}</Badge>

              <Badge color="gray">
                {subscription.cancel_at_period_end
                  ? `Cancels on ${dayjs(subscription.cancel_at).format('DD MMMM YYYY')}`
                  : `Renews on ${dayjs(subscription.current_period_end).format('DD MMMM YYYY')}`}
              </Badge>
            </div>
          ) : (
            <Text>
              Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
              customer loyalty, and driving sales.
            </Text>
          )}
        </div>
      </div>

      <RadioGroup
        className="mt-6"
        label="Select payment frequency"
        value={billingIntervalValue}
        options={billingIntervalOptions}
        onChange={option => setBillingInterval(option.value)}
      />

      <div className="mt-12 flex w-full flex-wrap gap-4 lg:flex-nowrap">
        {loading ? (
          <SkeletonLoader className="mx-auto h-80 w-80 max-w-lg" />
        ) : (
          products
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

              // check if the current price is the active price
              const active = activePrice?.id === price?.id

              // highlight the active product or the second product if there is no active product
              const highlight = Boolean((subscription && active) || (!subscription && index === 1))

              // @ts-expect-error features exists on metadata and if it doesn't exist, it's an empty array
              const features = (JSON.parse(product.metadata?.features) || []) as string[]

              return (
                <PricingCard
                  key={product.id}
                  title={product.name || ''}
                  description={product.description || ''}
                  price={price?.unit_amount || 0}
                  currency={price?.currency || ''}
                  interval={price?.interval || ''}
                  features={features}
                  highlight={highlight}
                  active={active}
                >
                  <Button
                    variant={highlight ? 'primary' : 'secondary'}
                    disabled={stripeLoading}
                    loading={stripeLoading}
                    onClick={() => onPricingCardClick(price?.id || '')}
                  >
                    {active ? 'Manage subscription' : 'Buy plan'}
                  </Button>
                </PricingCard>
              )
            })
        )}
      </div>
    </main>
  )
}
