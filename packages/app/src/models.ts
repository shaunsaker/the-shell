export const getTeamMembersQueryKey = (teamId: string) => `teams/${teamId}members`

export enum QueryKeys {
  AuthUser = 'authUser',
  Products = 'products',
  Prices = 'prices',
  Subscription = 'subscription',
  User = 'user',
  Teams = 'teams',
}
