import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useIsSubscriptionOwner = () => {
  const { data: subscriptionSeats, ...query } = useSubscriptionSeats()

  const isSubscriptionOwner = subscriptionSeats?.some(seat => seat.isSubscriptionOwner)

  return {
    ...query,
    data: isSubscriptionOwner,
  }
}
