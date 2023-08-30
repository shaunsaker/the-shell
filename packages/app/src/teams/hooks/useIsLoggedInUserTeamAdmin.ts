import { useParams } from 'react-router-dom'

import { useAuthUser } from '../../auth/hooks/useAuthUser'
import { useTeamMembers } from './useTeamMembers'

export const useIsLoggedInUserTeamAdmin = () => {
  const { teamId = '' } = useParams()
  const { data: authUser } = useAuthUser()
  const { data: teamMembers } = useTeamMembers(teamId)

  const authUserTeamMember = teamMembers?.find(teamMember => teamMember.userId === authUser?.uid)
  const isLoggedInUserTeamAdmin = authUserTeamMember?.role === 'admin'

  return isLoggedInUserTeamAdmin
}
