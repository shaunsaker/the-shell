export const TEAM_ID_PARAM = ':teamId'
export const TEAM_MEMBER_ID_PARAM = ':teamMemberId'

export const routes = {
  signUp: '/sign-up',
  signIn: '/sign-in',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
  settings: '/settings',
  settingsAccount: '/settings/account',
  settingsResetPassword: '/settings/account/reset-password',
  settingsSubscription: '/settings/subscription',
  settingsTeams: '/settings/teams',
  settingsAddTeam: '/settings/teams/add',
  settingsEditTeam: `/settings/teams/${TEAM_ID_PARAM}`,
  settingsDeleteTeam: `/settings/teams/${TEAM_ID_PARAM}/delete`,
  settingsInviteTeamMembers: `/settings/teams/${TEAM_ID_PARAM}/invite`,
  settingsAcceptInvite: `/settings/teams/${TEAM_ID_PARAM}/accept-invite`,
  settingsEditTeamMember: `/settings/teams/${TEAM_ID_PARAM}/team-members/${TEAM_MEMBER_ID_PARAM}`,
  settingsRemoveTeamMember: `/settings/teams/${TEAM_ID_PARAM}/team-members/${TEAM_MEMBER_ID_PARAM}/remove`,
}
