import React, { ReactElement } from 'react'

import { useCreateBillingPortalSession } from '../../../../../billing/hooks/useCreateBillingPortalSession'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useProducts } from '../../../../../billing/hooks/useProducts'
import { useSubscriptions } from '../../../../../billing/hooks/useSubscriptions'
import { useSubscriptionsListener } from '../../../../../billing/hooks/useSubscriptionsListener'
import { Button } from '../../../../../components/button/Button'
import { List } from '../../../../../components/list/List'
import { ListItem } from '../../../../../components/list/ListItem'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { useUser } from '../../../../../user/hooks/useUser'
import { formatBillingAddress } from '../../../../../utils/formatBillingAddress'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { formatDate } from '../../../../../utils/formatDate'
import { formatSubscriptionStatus } from '../../../../../utils/formatSubscriptionStatus'
import { parsePaymentMethod } from '../../../../../utils/parsePaymentMethod'

export const SubscriptionDetailsSection = (): ReactElement | null => {
  const { data: products } = useProducts()
  const { data: prices } = usePrices()
  useSubscriptionsListener()
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
    <SettingsSection
      title="Subscription details"
      description="Update your subscription details by clicking on the 'Manage plan' button."
    >
      <List>
        <ListItem>
          <span>Plan</span>

          <span>{activeProduct?.name}</span>
        </ListItem>

        <ListItem>
          <span>Status</span>

          <span>{subscription ? formatSubscriptionStatus(subscription.status) : ''}</span>
        </ListItem>

        <ListItem>
          <span>Quantity</span>

          <span>{subscription?.quantity}</span>
        </ListItem>

        <ListItem>
          <span>Cost per subscription</span>

          <span>
            {activePrice
              ? `${formatCurrency(activePrice.unitAmount / 100, activePrice.currency)} / ${activePrice?.interval}`
              : ''}
          </span>
        </ListItem>

        <ListItem>
          <span>Total cost</span>

          <span>
            {subscription && activePrice
              ? `${formatCurrency((subscription.quantity * activePrice.unitAmount) / 100, activePrice.currency)} / ${
                  activePrice?.interval
                }`
              : ''}
          </span>
        </ListItem>

        {subscription?.status === 'trialing' && (
          <>
            <ListItem>
              <span>Trial started</span>

              <span>{formatDate(subscription.trialStart)}</span>
            </ListItem>

            <ListItem>
              <span>Trial ends</span>

              <span>{formatDate(subscription.trialEnd)}</span>
            </ListItem>
          </>
        )}

        {subscription?.status === 'active' && (
          <ListItem>
            <span>Previous payment</span>

            <span>{formatDate(subscription.currentPeriodStart)}</span>
          </ListItem>
        )}

        {subscription?.cancelAtPeriodEnd ? (
          <ListItem>
            <span>Cancels on</span>

            <span>{formatDate(subscription.cancelAt)}</span>
          </ListItem>
        ) : (
          <ListItem>
            <span>Renews on</span>

            <span>{subscription ? formatDate(subscription.currentPeriodEnd) : ''}</span>
          </ListItem>
        )}

        <ListItem>
          <span>Payment card</span>

          <span>
            {user && user.paymentMethod ? `**** **** **** ${parsePaymentMethod(user.paymentMethod).last4}` : ''}
          </span>
        </ListItem>

        <ListItem className="items-start">
          <span className="mr-8">Billing address</span>

          <span className="whitespace-break-spaces text-right">
            {user && user.billingAddress ? formatBillingAddress(user.billingAddress) : ''}
          </span>
        </ListItem>
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
    </SettingsSection>
  )
}
