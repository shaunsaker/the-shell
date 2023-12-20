import { Button, List } from 'components'
import React from 'react'
import { formatBillingAddress, formatCurrency, formatDate, formatSubscriptionStatus, parsePaymentMethod } from 'utils'

import { useCreateBillingPortalSession } from '@/billing/hooks/useCreateBillingPortalSession'
import { usePrices } from '@/billing/hooks/usePrices'
import { useProducts } from '@/billing/hooks/useProducts'
import { useSubscriptions } from '@/billing/hooks/useSubscriptions'
import { useSubscriptionsListener } from '@/billing/hooks/useSubscriptionsListener'
import { PageSection } from '@/components/pageSection/PageSection'
import { useUser } from '@/user/hooks/useUser'

export const SubscriptionDetailsSection = () => {
  useSubscriptionsListener()
  const { data: products } = useProducts()
  const { data: prices } = usePrices()
  const { data: subscriptions } = useSubscriptions()
  const { data: user } = useUser()

  const { mutate: createBillingPortalSession, isLoading: createBillingPortalSessionLoading } =
    useCreateBillingPortalSession()

  // currently we only support having one owned subscription
  const subscription = subscriptions && subscriptions[0]

  // get the active price
  const activePrice = prices?.find(price => price.id === subscription?.priceId)

  // get the active product
  const activeProduct = products?.find(product => product.id === activePrice?.productId)

  return (
    <PageSection
      className="pt-0 lg:pt-0"
      title="Subscription details"
      description="Update your subscription details by clicking on the 'Manage plan' button."
      fullWidth={false}
    >
      <List>
        <List.Item>
          <span>Plan</span>

          <span>{activeProduct?.name}</span>
        </List.Item>

        <List.Item>
          <span>Status</span>

          <span>{subscription ? formatSubscriptionStatus(subscription.status) : ''}</span>
        </List.Item>

        <List.Item>
          <span>Quantity</span>

          <span>{subscription?.quantity}</span>
        </List.Item>

        <List.Item>
          <span>Cost per subscription</span>

          <span>
            {activePrice
              ? `${formatCurrency(activePrice.unitAmount / 100, activePrice.currency)} / ${activePrice?.interval}`
              : ''}
          </span>
        </List.Item>

        <List.Item>
          <span>Total cost</span>

          <span>
            {subscription && activePrice
              ? `${formatCurrency((subscription.quantity * activePrice.unitAmount) / 100, activePrice.currency)} / ${
                  activePrice?.interval
                }`
              : ''}
          </span>
        </List.Item>

        {subscription?.status === 'trialing' && (
          <>
            <List.Item>
              <span>Trial started</span>

              <span>{formatDate(subscription.trialStart)}</span>
            </List.Item>

            <List.Item>
              <span>Trial ends</span>

              <span>{formatDate(subscription.trialEnd)}</span>
            </List.Item>
          </>
        )}

        {subscription?.status === 'active' && (
          <List.Item>
            <span>Previous payment</span>

            <span>{formatDate(subscription.currentPeriodStart)}</span>
          </List.Item>
        )}

        {subscription?.cancelAtPeriodEnd ? (
          <List.Item>
            <span>Cancels on</span>

            <span>{formatDate(subscription.cancelAt)}</span>
          </List.Item>
        ) : (
          <List.Item>
            <span>Renews on</span>

            <span>{subscription ? formatDate(subscription.currentPeriodEnd) : ''}</span>
          </List.Item>
        )}

        <List.Item>
          <span>Payment card</span>

          <span>
            {user && user.paymentMethod ? `**** **** **** ${parsePaymentMethod(user.paymentMethod).last4}` : ''}
          </span>
        </List.Item>

        <List.Item className="items-start">
          <span className="mr-8">Billing address</span>

          <span className="whitespace-break-spaces text-right">
            {user && user.billingAddress ? formatBillingAddress(user.billingAddress) : ''}
          </span>
        </List.Item>
      </List>

      <div>
        <Button
          loading={createBillingPortalSessionLoading}
          disabled={createBillingPortalSessionLoading}
          onClick={() => {
            createBillingPortalSession()
          }}
        >
          Manage plan
        </Button>
      </div>
    </PageSection>
  )
}
