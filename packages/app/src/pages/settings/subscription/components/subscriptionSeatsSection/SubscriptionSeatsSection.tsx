import React, { ReactElement, useEffect, useState } from 'react'
import { Price } from 'types'

import { useHasTeamPlan } from '../../../../../billing/hooks/useHasTeamPlan'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { useUpdateSubscriptionQuantity } from '../../../../../billing/hooks/useUpdateSubscriptionQuantity'
import { Button } from '../../../../../components/button/Button'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { maybePluralise } from '../../../../../utils/maybePluralise'
import { SubscriptionNotFound } from '../subscriptionNotFound/SubscriptionNotFound'

const MIN_SEATS = 1

const getButtonLabel = (numberOfNewSeats: number, activePrice?: Price | null): string => {
  if (!numberOfNewSeats || !activePrice || !activePrice.unitAmount || !activePrice.currency) {
    return 'Update plan'
  }

  const seatsText = `${Math.abs(numberOfNewSeats)} ${maybePluralise(Math.abs(numberOfNewSeats), 'seat')}`
  const costText = formatCurrency((Math.abs(numberOfNewSeats) * activePrice.unitAmount) / 100, activePrice.currency)

  if (numberOfNewSeats > 0) {
    return `Add ${seatsText} for an additional ${costText} per ${activePrice.interval}`
  }

  return `Remove ${seatsText} for ${costText} per ${activePrice.interval} less`
}

export const SubscriptionSeatsSection = (): ReactElement | null => {
  const [seats, setSeats] = useState(MIN_SEATS.toString())
  const { data: prices } = usePrices()
  const { data: subscription } = useSubscription()
  const { mutate: updateSubscriptionQuantity, isLoading: updateSubscriptionQuantityLoading } =
    useUpdateSubscriptionQuantity()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()

  // get the active price
  const activePrice = prices?.find(price => price.id === subscription?.priceId)

  // calculate the number of new seats
  const numberOfNewSeats = subscription?.quantity ? parseInt(seats) - subscription.quantity : 0

  // disable the button if the user does not have a team plan or the number of seats is the same as the current subscription
  const inputDisabled = hasTeamPlanLoading || !hasTeamPlan || updateSubscriptionQuantityLoading
  const buttonDisabled = hasTeamPlanLoading || !hasTeamPlan || !numberOfNewSeats || updateSubscriptionQuantityLoading

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
      description={
        hasTeamPlan
          ? 'Add or remove seats from your subscription.'
          : 'Adding seats to your subscription is only available on the team plan.'
      }
    >
      <TextInput
        className="w-20"
        type="number"
        placeholder="Enter seats"
        min={MIN_SEATS}
        disabled={inputDisabled}
        value={seats}
        onChange={event =>
          parseInt(event.target.value) >= MIN_SEATS ? setSeats(event.target.value) : setSeats(MIN_SEATS.toString())
        }
      />

      <div>
        <Button
          loading={updateSubscriptionQuantityLoading}
          disabled={buttonDisabled}
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
