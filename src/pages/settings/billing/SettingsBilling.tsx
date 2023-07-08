import { Button, List, ListItem, Metric, Text } from '@tremor/react'
import React, { ReactElement, useCallback, useEffect } from 'react'

import { RadioGroup } from '../../../components/radioGroup/RadioGroup'
import { SkeletonLoader } from '../../../components/skeletonLoader/SkeletonLoader'
import { useCreateBillingPortalSession } from '../../../hooks/billing/useCreateBillingPortalSession'
import { useCreateCheckoutSession } from '../../../hooks/billing/useCreateCheckoutSession'
import { useProducts } from '../../../hooks/db/useProducts'
import { useSubscriptions } from '../../../hooks/db/useSubscriptions'
import { useUser } from '../../../hooks/db/useUser'
import { formatBillingAddress } from '../../../utils/formatBillingAddress'
import { formatDate } from '../../../utils/formatDate'
import { parsePaymentMethod } from '../../../utils/parsePaymentMethod'
import { parseProductMetadata } from '../../../utils/parseProductMetadata'
import { PricingCard } from './pricingCard/PricingCard'

const subscriptionStatusToLabel = (status: string | null): string => {
  switch (status) {
    case 'trialing':
      return 'Trial'
    case 'active':
      return 'Active'
    case 'past_due':
      return 'Past due'
    case 'canceled':
      return 'Canceled'
    case 'unpaid':
      return 'Unpaid'
    default:
      return ''
  }
}

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
  const { data: subscriptions, isLoading: subscriptionsLoading } = useSubscriptions()
  const { data: products, isLoading: productsLoading } = useProducts()
  const { data: user, isLoading: userLoading } = useUser()
  const { mutate: createBillingPortalSession, isLoading: createBillingPortalSessionLoading } =
    useCreateBillingPortalSession()
  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  const dataLoading = subscriptionsLoading || productsLoading || userLoading
  const billingLoading = createBillingPortalSessionLoading || createCheckoutSessionLoading

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
      if (subscription) {
        await createBillingPortalSession()
      } else {
        await createCheckoutSession(priceId)
      }
    },
    [createBillingPortalSession, createCheckoutSession, subscription]
  )

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-lg text-center">
        <Text className="text-tremor-brand dark:text-dark-tremor-brand">Pricing</Text>

        <Metric className="mt-4">
          {subscription && user ? 'Your plan details' : 'Pricing plans for teams of all sizes'}
        </Metric>

        <div className="mt-8">
          {subscription && user ? (
            <List>
              <ListItem>
                <span>Status</span>

                <span>{subscriptionStatusToLabel(subscription.status)}</span>
              </ListItem>

              {subscription.status === 'trialing' && (
                <ListItem>
                  <span>Trial started</span>

                  <span>{formatDate(subscription.trial_start)}</span>
                </ListItem>
              )}

              {subscription.status === 'active' && (
                <ListItem>
                  <span>Last payment</span>

                  <span>{formatDate(subscription.current_period_start)}</span>
                </ListItem>
              )}

              {subscription.cancel_at_period_end ? (
                <ListItem>
                  <span>Cancels on</span>

                  <span>{formatDate(subscription.canceled_at)}</span>
                </ListItem>
              ) : (
                <ListItem>
                  <span>Renews on</span>

                  <span>{formatDate(subscription.current_period_end)}</span>
                </ListItem>
              )}

              <ListItem>
                <span>Last 4 digits of card</span>

                <span>{parsePaymentMethod(user.payment_method).last4}</span>
              </ListItem>

              <ListItem>
                <span className="mr-8">Billing address</span>

                <span className="overflow-hidden text-ellipsis">{formatBillingAddress(user.billing_address)}</span>
              </ListItem>
            </List>
          ) : (
            <Text>
              Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
              customer loyalty, and driving sales.
            </Text>
          )}
        </div>
      </div>

      <RadioGroup
        className="mt-8"
        label="Select payment frequency"
        value={billingIntervalValue}
        options={billingIntervalOptions}
        onChange={option => setBillingInterval(option.value)}
      />

      <div className="mt-8 flex w-full flex-wrap gap-4 lg:flex-nowrap">
        {dataLoading ? (
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
                  highlight={highlight}
                  active={active}
                >
                  <Button
                    variant={highlight ? 'primary' : 'secondary'}
                    disabled={billingLoading}
                    loading={billingLoading}
                    onClick={() => onPricingCardClick(price?.id || '')}
                  >
                    {active ? 'Manage plan' : freeTrialDays ? `Start ${freeTrialDays} day free trial` : 'Buy plan'}
                  </Button>
                </PricingCard>
              )
            })
        )}
      </div>
    </main>
  )
}
