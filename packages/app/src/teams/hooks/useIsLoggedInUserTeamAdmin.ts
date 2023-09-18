import { useParams } from 'react-router-dom'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { useTeamMembers } from './useTeamMembers'

export const useIsLoggedInUserTeamAdmin = () => {
  const { teamId = '' } = useParams()
  const { data: authUser, isLoading: isAuthUserLoading } = useAuthUser()
  const { data: teamMembers, isLoading: isTeamMembersLoading } = useTeamMembers(teamId)

  const authUserTeamMember = teamMembers?.find(teamMember => teamMember.userId === authUser?.uid)
  const isLoggedInUserTeamAdmin = authUserTeamMember?.role === 'admin'
  const isLoading = isAuthUserLoading || isTeamMembersLoading

  return { data: isLoggedInUserTeamAdmin, isLoading }
}
