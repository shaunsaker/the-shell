import { useSubscription } from '../../billing/hooks/useSubscription'
import { useTeams } from './useTeams'

export const useSubscriptionSeats = () => {
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()
  const { data: teams, isLoading: teamsLoading } = useTeams()

  const totalSeats = subscription?.quantity || 0
  const assignedSeats = teams?.reduce((count, team) => count + team.members.length, 0) || 0
  const availableSeats = totalSeats - assignedSeats
  const isLoading = subscriptionLoading || teamsLoading

  return {
    data: {
      totalSeats,
      assignedSeats,
      availableSeats,
    },
    isLoading,
  }
}
