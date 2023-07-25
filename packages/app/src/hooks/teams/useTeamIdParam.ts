import { useParams } from 'next/navigation'

export const useTeamIdParam = () => {
  const { teamId = '' } = useParams()

  return String(teamId)
}
