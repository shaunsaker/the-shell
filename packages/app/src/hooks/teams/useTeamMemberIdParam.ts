import { useParams } from 'next/navigation'

export const useTeamMemberIdParam = () => {
  const { teamMemberId = '' } = useParams()

  return String(teamMemberId)
}
