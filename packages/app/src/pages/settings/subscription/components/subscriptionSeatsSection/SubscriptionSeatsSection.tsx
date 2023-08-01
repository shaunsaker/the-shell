import { Button, TextInput } from '@tremor/react'
import React, { ReactElement, useEffect, useState } from 'react'

import { useProducts } from '../../../../../billing/hooks/useProducts'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { useUpdateSubscriptionQuantity } from '../../../../../billing/hooks/useUpdateSubscriptionQuantity'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { Price } from '../../../../../models'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { getActivePriceFromProducts } from '../../../../../utils/getActivePriceFromProducts'
import { maybePluralise } from '../../../../../utils/maybePluralise'
import { SubscriptionNotFound } from '../subscriptionNotFound/SubscriptionNotFound'

const MIN_SEATS = 1

const getButtonLabel = (numberOfNewSeats: number, activePrice?: Price | null): string => {
  if (!numberOfNewSeats || !activePrice || !activePrice.unit_amount || !activePrice.currency) {
    return 'Update plan'
  }

  const seatsText = `${Math.abs(numberOfNewSeats)} ${maybePluralise(Math.abs(numberOfNewSeats), 'seat')}`
  const costText = formatCurrency((Math.abs(numberOfNewSeats) * activePrice.unit_amount) / 100, activePrice.currency)

  if (numberOfNewSeats > 0) {
    return `Add ${seatsText} for an additional ${costText} per ${activePrice.interval}`
  }

  return `Remove ${seatsText} for ${costText} per ${activePrice.interval} less`
}

export const SubscriptionSeatsSection = (): ReactElement | null => {
  const [seats, setSeats] = useState(MIN_SEATS.toString())
  const { data: products } = useProducts()
  const { data: subscription } = useSubscription()
  const { mutate: updateSubscriptionQuantity, isLoading: updateSubscriptionQuantityLoading } =
    useUpdateSubscriptionQuantity()

  // get the active price
  const activePrice = getActivePriceFromProducts(products, subscription?.price_id)

  // calculate the number of new seats
  const numberOfNewSeats = subscription?.quantity ? parseInt(seats) - subscription.quantity : 0

  // disable the button if the number of seats is the same as the current subscription
  const disabled = !numberOfNewSeats || updateSubscriptionQuantityLoading

  useEffect(() => {
    if (subscription && subscription.quantity) {
      setSeats(subscription.quantity.toString())
    }
  }, [subscription])

  if (!subscription) {
    return <SubscriptionNotFound />
  }

  return (
    <SettingsSection
      className="border-b-0"
      title="Subscription seats"
      description="Add or remove seats from your subscription."
    >
      <TextInput
        className="w-20"
        placeholder="Enter seats"
        min={MIN_SEATS}
        value={seats}
        onChange={event =>
          parseInt(event.target.value) >= MIN_SEATS ? setSeats(event.target.value) : setSeats(MIN_SEATS.toString())
        }
        // @ts-expect-error tremor TextInput types are incorrect
        type="number"
      />

      <div>
        <Button
          loading={updateSubscriptionQuantityLoading}
          disabled={disabled}
          onClick={() => {
            updateSubscriptionQuantity(parseInt(seats))
          }}
        >
          {getButtonLabel(numberOfNewSeats, activePrice)}
        </Button>
      </div>
    </SettingsSection>
  )
}
