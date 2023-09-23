import React, { ReactElement, useEffect, useState } from 'react'
import { Price } from 'types'

import { useHasTeamPlan } from '../../../../../billing/hooks/useHasTeamPlan'
import { usePrices } from '../../../../../billing/hooks/usePrices'
import { useSubscriptionInfo } from '../../../../../billing/hooks/useSubscriptionInfo'
import { useUpdateSubscriptionQuantity } from '../../../../../billing/hooks/useUpdateSubscriptionQuantity'
import { Alert } from '../../../../../components/alert/Alert'
import { Button } from '../../../../../components/button/Button'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { Text } from '../../../../../components/text/Text'
import { TextInput } from '../../../../../components/textInput/TextInput'
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { maybePluralise } from '../../../../../utils/maybePluralise'

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
  const { mutate: updateSubscriptionQuantity, isLoading: updateSubscriptionQuantityLoading } =
    useUpdateSubscriptionQuantity()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()
  const { data: subscriptionInfo, isLoading: subscriptionInfoLoading } = useSubscriptionInfo()

  const activePrice = prices?.find(price => price.id === subscriptionInfo?.priceId)
  const numberOfNewSeats = subscriptionInfo?.totalSeats ? parseInt(seats) - subscriptionInfo.totalSeats : 0
  const inputDisabled =
    hasTeamPlanLoading || !hasTeamPlan || updateSubscriptionQuantityLoading || subscriptionInfoLoading
  const newSeatsLessThanAssignedSeats = subscriptionInfo && parseInt(seats) < subscriptionInfo.assignedSeats
  const buttonDisabled = !numberOfNewSeats || newSeatsLessThanAssignedSeats

  useEffect(() => {
    if (subscriptionInfo && subscriptionInfo.totalSeats) {
      setSeats(subscriptionInfo.totalSeats.toString())
    }
  }, [subscriptionInfo])

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
      <Text>
        Available Seats: {subscriptionInfo?.availableSeats} / {subscriptionInfo?.totalSeats}
      </Text>

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

      {newSeatsLessThanAssignedSeats && (
        <Alert kind="error">
          You cannot remove seats below the number of available seats. Please remove assigned seats first.
        </Alert>
      )}

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
