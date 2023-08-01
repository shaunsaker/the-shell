import { Button, List, ListItem } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useCreateBillingPortalSession } from '../../../../../billing/hooks/useCreateBillingPortalSession'
import { useProducts } from '../../../../../billing/hooks/useProducts'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { useUser } from '../../../../../users/hooks/useUser'
import { formatBillingAddress } from '../../../../../utils/formatBillingAddress'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { formatDate } from '../../../../../utils/formatDate'
import { getActivePriceFromProducts } from '../../../../../utils/getActivePriceFromProducts'
import { getActiveProductByPriceId } from '../../../../../utils/getActiveProductByPriceId'
import { parsePaymentMethod } from '../../../../../utils/parsePaymentMethod'
import { SubscriptionNotFound } from '../subscriptionNotFound/SubscriptionNotFound'
import { UserNotFound } from './userNotFound/UserNotFound'

const formatSubscriptionStatus = (status: string | null): string => {
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

export const SubscriptionDetailsSection = (): ReactElement | null => {
  const { data: products } = useProducts()
  const { data: subscription } = useSubscription()
  const { data: user } = useUser()
  const { mutate: createBillingPortalSession, isLoading: createBillingPortalSessionLoading } =
    useCreateBillingPortalSession()

  // get the active product
  const activeProduct = getActiveProductByPriceId(products, subscription?.price_id)

  // get the active price
  const activePrice = getActivePriceFromProducts(products, subscription?.price_id)

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

        {subscription.quantity && activePrice?.unit_amount && activePrice?.currency && (
          <ListItem>
            <span>Cost per seat</span>

            <span>
              {formatCurrency(activePrice.unit_amount / 100, activePrice.currency)} / {activePrice?.interval}
            </span>
          </ListItem>
        )}

        {subscription.quantity && activePrice?.unit_amount && activePrice?.currency && (
          <ListItem>
            <span>Total cost</span>

            <span>
              {formatCurrency((subscription.quantity * activePrice.unit_amount) / 100, activePrice.currency)} /{' '}
              {activePrice?.interval}
            </span>
          </ListItem>
        )}

        {subscription.status === 'trialing' && (
          <>
            <ListItem>
              <span>Trial started</span>

              <span>{formatDate(subscription.trial_start)}</span>
            </ListItem>

            <ListItem>
              <span>Trial ends</span>

              <span>{formatDate(subscription.trial_end)}</span>
            </ListItem>
          </>
        )}

        {subscription.status === 'active' && (
          <ListItem>
            <span>Previous payment</span>

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
          <span>Payment card</span>

          <span>**** **** **** {parsePaymentMethod(user.payment_method).last4}</span>
        </ListItem>

        <ListItem className="items-start">
          <span className="mr-8">Billing address</span>

          <span className="whitespace-break-spaces text-right">{formatBillingAddress(user.billing_address)}</span>
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
