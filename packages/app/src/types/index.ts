import { ReactNode } from 'react'

// QUERIES
export const getTeamMembersQueryKey = (teamId: string) => `teams/${teamId}/members`

export enum QueryKeys {
  AuthUser = 'authUser',
  Products = 'products',
  Prices = 'prices',
  Subscription = 'subscription',
  User = 'user',
  Teams = 'teams',
}

// UI
export type NavigationItem = {
  name: string
  href: string
  icon?: ReactNode
  isActive?: boolean
  disabled?: boolean
}
