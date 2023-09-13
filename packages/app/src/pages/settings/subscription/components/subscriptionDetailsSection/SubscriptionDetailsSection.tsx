import React, { ReactElement } from 'react'
import { SubscriptionStatus } from 'types'

import { useCreateBillingPortalSession } from '../../../../../billing/hooks/useCreateBillingPortalSession'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useProducts } from '../../../../../billing/hooks/useProducts'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { Button } from '../../../../../components/button/Button'
import { List } from '../../../../../components/list/List'
import { ListItem } from '../../../../../components/list/ListItem'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { useUser } from '../../../../../users/hooks/useUser'
import { formatBillingAddress } from '../../../../../utils/formatBillingAddress'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { formatDate } from '../../../../../utils/formatDate'
import { parsePaymentMethod } from '../../../../../utils/parsePaymentMethod'
import { SubscriptionNotFound } from '../subscriptionNotFound/SubscriptionNotFound'
import { UserNotFound } from './userNotFound/UserNotFound'

const formatSubscriptionStatus = (status: SubscriptionStatus): string => {
  switch (status) {
    case SubscriptionStatus.Trialing:
      return 'Trial'
    case SubscriptionStatus.Active:
      return 'Active'
    case SubscriptionStatus.PastDue:
      return 'Past due'
    case SubscriptionStatus.Canceled:
      return 'Canceled'
    case SubscriptionStatus.Unpaid:
      return 'Unpaid'
    default:
      return ''
  }
}

export const SubscriptionDetailsSection = (): ReactElement | null => {
  const { data: products } = useProducts()
  const { data: prices } = usePrices()
  const { data: subscription } = useSubscription()
  const { data: user } = useUser()
  const { mutate: createBillingPortalSession, isLoading: createBillingPortalSessionLoading } =
    useCreateBillingPortalSession()

  // get the active price
  const activePrice = prices?.find(price => price.id === subscription?.priceId)

  // get the active product
  const activeProduct = products?.find(product => product.id === activePrice?.productId)

  if (!subscription) {
    return <SubscriptionNotFound />
  }

  if (!user) {
    return <UserNotFound />
  }

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

          <span>{formatSubscriptionStatus(subscription.status)}</span>
        </ListItem>

        <ListItem>
          <span>Seats</span>

          <span>{subscription.quantity}</span>
        </ListItem>

        {subscription.quantity && activePrice?.unitAmount && activePrice?.currency && (
          <ListItem>
            <span>Cost per seat</span>

            <span>
              {formatCurrency(activePrice.unitAmount / 100, activePrice.currency)} / {activePrice?.interval}
            </span>
          </ListItem>
        )}

        {subscription.quantity && activePrice?.unitAmount && activePrice?.currency && (
          <ListItem>
            <span>Total cost</span>

            <span>
              {formatCurrency((subscription.quantity * activePrice.unitAmount) / 100, activePrice.currency)} /{' '}
              {activePrice?.interval}
            </span>
          </ListItem>
        )}

        {subscription.status === 'trialing' && (
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

        {subscription.status === 'active' && (
          <ListItem>
            <span>Previous payment</span>

            <span>{formatDate(subscription.currentPeriodStart)}</span>
          </ListItem>
        )}

        {subscription.cancelAtPeriodEnd ? (
          <ListItem>
            <span>Cancels on</span>

            <span>{formatDate(subscription.cancelAt)}</span>
          </ListItem>
        ) : (
          <ListItem>
            <span>Renews on</span>

            <span>{formatDate(subscription.currentPeriodEnd)}</span>
          </ListItem>
        )}

        <ListItem>
          <span>Payment card</span>

          <span>**** **** **** {parsePaymentMethod(user.paymentMethod).last4}</span>
        </ListItem>

        <ListItem className="items-start">
          <span className="mr-8">Billing address</span>

          <span className="whitespace-break-spaces text-right">{formatBillingAddress(user.billingAddress)}</span>
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
