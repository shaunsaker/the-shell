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

// USER MANAGEMENT
export enum UserManagementParams {
  Mode = 'mode',
  ActionCode = 'oobCode',
  NewPassword = 'newPassword',
  OldEmail = 'oldEmail',
  NewEmail = 'newEmail',
  Email = 'email',
}

// UI
export type NavigationItem = {
  name: string
  href: string
  icon?: ReactNode
  active?: boolean
  disabled?: boolean
}

// TESTING
export enum TestIds {
  Loading = 'loading',
}
