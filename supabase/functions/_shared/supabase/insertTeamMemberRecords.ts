import { supabaseAdmin } from './supabaseAdmin.ts'

export const insertTeamMemberRecords = async (
  teamMembers: {
    teamId: number
    userId: string
    role: string
    status: string
  }[]
) => {
  const teamMembersData = teamMembers.map(teamMember => ({
    team_id: teamMember.teamId,
    user_id: teamMember.userId,
    role: teamMember.role,
    status: teamMember.status,
  }))

  const { data, error } = await supabaseAdmin.from('team_members').insert(teamMembersData).select()

  if (error) {
    throw error
  }

  console.log(`Team member(s) inserted successfully: ${JSON.stringify(data)}`)

  return data
}
