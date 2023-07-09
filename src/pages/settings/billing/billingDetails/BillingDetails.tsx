import { Button, List, ListItem } from '@tremor/react'
import React, { ReactElement } from 'react'

import { Loading } from '../../../../components/loading/Loading'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { useCreateBillingPortalSession } from '../../../../hooks/billing/useCreateBillingPortalSession'
import { useProducts } from '../../../../hooks/db/useProducts'
import { useSubscriptions } from '../../../../hooks/db/useSubscriptions'
import { useUser } from '../../../../hooks/db/useUser'
import { formatBillingAddress } from '../../../../utils/formatBillingAddress'
import { formatCurrency } from '../../../../utils/formatCurrency'
import { formatDate } from '../../../../utils/formatDate'
import { parsePaymentMethod } from '../../../../utils/parsePaymentMethod'

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

export const BillingDetails = (): ReactElement | null => {
  const { data: products, isLoading: productsLoading } = useProducts()
  const { data: subscriptions, isLoading: subscriptionsLoading } = useSubscriptions()
  const { data: user, isLoading: userLoading } = useUser()
  const { mutate: createBillingPortalSession, isLoading: createBillingPortalSessionLoading } =
    useCreateBillingPortalSession()

  const dataLoading = productsLoading || subscriptionsLoading || userLoading

  // get the latest subscription
  const subscription = subscriptions && subscriptions[0]

  // get the active product
  const activeProduct = products?.filter(product =>
    product.prices.some(price => price.id === subscription?.price_id)
  )[0]
  const activePrice = activeProduct?.prices?.filter(price => price.id === subscription?.price_id)?.[0]

  if (dataLoading) {
    return <Loading />
  }

  if (!subscription || !user) {
    return null
  }

  return (
    <main className="flex flex-col items-center">
      <SettingsSection
        className="border-b-0"
        title="Billing details"
        description="Update your billing details by clicking on 'Manage plan'."
      >
        <List>
          <ListItem>
            <span>Plan</span>

            <span>{activeProduct?.name}</span>
          </ListItem>

          {activePrice?.unit_amount && activePrice?.currency && (
            <ListItem>
              <span>Cost</span>

              <span>
                {formatCurrency(activePrice.unit_amount / 100, activePrice.currency)} / {activePrice?.interval}
              </span>
            </ListItem>
          )}

          <ListItem>
            <span>Status</span>

            <span>{subscriptionStatusToLabel(subscription.status)}</span>
          </ListItem>

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
            <span>Seats</span>

            <span>{subscription.quantity}</span>
          </ListItem>

          <ListItem>
            <span>Payment card</span>

            <span>**** **** **** {parsePaymentMethod(user.payment_method).last4}</span>
          </ListItem>

          <ListItem>
            <span className="mr-8">Billing address</span>

            <span className="overflow-hidden text-ellipsis">{formatBillingAddress(user.billing_address)}</span>
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
    </main>
  )
}
