import { Badge, Button, Metric, Text } from '@tremor/react'
import dayjs from 'dayjs'
import React, { ReactElement, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import { RadioGroup } from '../../../components/radioGroup/RadioGroup'
import { SkeletonLoader } from '../../../components/skeletonLoader/SkeletonLoader'
import { useLink } from '../../../hooks/useLink'
import { createCheckoutSession } from '../../../services/stripe/createCheckoutSession'
import { createOrRetrieveCustomer } from '../../../services/stripe/createOrRetrieveCustomer'
import { createBillingPortalSession } from '../../../services/stripe/createPortalSession'
import { BillingInterval, useProducts } from '../../../store/products/useProducts'
import { useSubscription } from '../../../store/subscription/useSubscription'
import { useSession } from '../../../store/user/useSession'
import { PricingCard } from './pricingCard/PricingCard'

const billingIntervalValueToLabel = (value: BillingInterval): string => {
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
  const { session, loading: sessionLoading } = useSession()
  const { subscription, loading: subscriptionLoading } = useSubscription()
  const { products, loading: productsLoading } = useProducts()
  const [stripeLoading, setStripeLoading] = useState(false)
  const link = useLink()

  const loading = sessionLoading || subscriptionLoading || productsLoading

  // using the subscription, if it exists, find the active product
  const activeProduct =
    subscription && products.filter(product => product.prices.some(price => price.id === subscription.price_id))[0]
  const activePrice = activeProduct?.prices?.filter(price => price.id === subscription?.price_id)?.[0]

  // get the unique billing intervals from the prices
  const billingIntervals = Array.from(
    new Set(products.flatMap(product => product?.prices?.map(price => price?.interval)))
  ).filter(Boolean)
  const [billingInterval, setBillingInterval] = React.useState(activePrice?.interval || billingIntervals[0])

  // transform the billing interval into radio group options
  const billingIntervalValue = { label: billingIntervalValueToLabel(billingInterval), value: billingInterval }
  const billingIntervalOptions = billingIntervals.map(billingInterval => ({
    label: billingIntervalValueToLabel(billingInterval),
    value: billingInterval,
  }))

  const onPricingCardClick = useCallback(
    async (priceId: string) => {
      if (!session?.user) throw new Error('User is not authenticated!')

      setStripeLoading(true)

      let customerId = ''

      try {
        customerId = await createOrRetrieveCustomer({ email: session?.user.email || '', uuid: session?.user.id })
      } catch (error) {
        toast.error((error as Error).message)
      }

      if (subscription) {
        try {
          const session = await createBillingPortalSession(customerId)

          if (!session.url) {
            throw new Error("Couldn't create a billing portal session")
          }

          link(session.url, '_self')
        } catch (error) {
          toast.error((error as Error).message)
        }
      } else {
        try {
          const session = await createCheckoutSession({ customerId, priceId })

          if (!session.url) {
            throw new Error("Couldn't create a checkout session")
          }

          link(session.url, '_self')
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
        onChange={option => setBillingInterval(option.value as BillingInterval)}
      />

      <div className="mt-12 flex w-full flex-wrap gap-4 lg:flex-nowrap">
        {loading ? (
          <SkeletonLoader className="mx-auto h-80 w-80 max-w-lg" />
        ) : (
          products.map((product, index) => {
            const price = product.prices?.filter(price => price.interval === billingInterval)[0]
            const active = activePrice?.id === price?.id
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
