import { ReactNode } from 'react'

// QUERIES
export const getTeamMembersQueryKey = (teamId: string) => `teams/${teamId}/members`

export enum QueryKeys {
  AuthUser = 'authUser',
  Products = 'products',
  Prices = 'prices',
  Subscriptions = 'subscriptions',
  SubscriptionSeats = 'subscriptionSeats',
  SubscriptionInfo = 'subscriptionInfo',
  Teams = 'teams',
  User = 'user',
}

// UI
export type NavigationItem = {
  name: string
  href: string
  icon?: ReactNode
  isActive?: boolean
  disabled?: boolean
}
