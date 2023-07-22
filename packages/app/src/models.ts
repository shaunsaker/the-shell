import { Database } from './types/supabase'

export enum QueryKeys {
  Session = 'session',
  Products = 'products',
  Subscription = 'subscription',
  User = 'user',
  Teams = 'teams',
}

type Product = Database['public']['Tables']['products']['Row']

export type Price = Database['public']['Tables']['prices']['Row']

export type ProductWithPrices = Product & { prices: Price[] }

export type Subscription = Database['public']['Tables']['subscriptions']['Row']

export type Team = Database['public']['Tables']['teams']['Row']

export type TeamMember = Database['public']['Tables']['team_members']['Row']

export type TeamWithTeamMembers = Team & {
  team_members: TeamMember[]
}

export type TeamMemberRole = Database['public']['Enums']['team_member_role']

export type TeamMemberStatus = Database['public']['Enums']['team_member_status']
