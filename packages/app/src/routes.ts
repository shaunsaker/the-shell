export const TEAM_ID_PARAM = ':teamId'
export const TEAM_MEMBER_ID_PARAM = ':teamMemberId'

// FIXME: SS this should be an enum
export const routes = {
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  signIn: '/sign-in',
  forgotPassword: '/forgot-password',
  dashboard: '/',
  settings: '/settings',
  settingsAccount: '/settings/account',
  settingsResetPassword: '/settings/account/reset-password',
  settingsSubscription: '/settings/subscription',
  settingsTeams: '/settings/teams',
  settingsAddTeam: '/settings/teams/add',
  settingsEditTeam: `/settings/teams/${TEAM_ID_PARAM}`,
  settingsDeleteTeam: `/settings/teams/${TEAM_ID_PARAM}/delete`,
  settingsInviteTeamMembers: `/settings/teams/${TEAM_ID_PARAM}/invite`,
  settingsEditTeamMember: `/settings/teams/${TEAM_ID_PARAM}/team-members/${TEAM_MEMBER_ID_PARAM}`,
  settingsRemoveTeamMember: `/settings/teams/${TEAM_ID_PARAM}/team-members/${TEAM_MEMBER_ID_PARAM}/remove`,
}
