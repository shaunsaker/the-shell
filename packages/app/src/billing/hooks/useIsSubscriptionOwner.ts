import { useSubscriptionSeats } from './useSubscriptionSeats'

// TODO: SS test me
export const useIsSubscriptionOwner = () => {
  const { data: subscriptionSeats, ...query } = useSubscriptionSeats()

  const isSubscriptionOwner = subscriptionSeats?.some(seat => seat.isSubscriptionOwner)

  return {
    ...query,
    data: isSubscriptionOwner,
  }
}
