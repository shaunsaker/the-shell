import { supabaseAdmin } from './supabaseAdmin.js'

export const insertTeamMemberRecords = async (
  teamMembers: {
    teamId: number
    userId: string
    role: string
    status: string
    firstName: string
    lastName: string
    email: string
  }[],
) => {
  const teamMembersData = teamMembers.map(teamMember => ({
    team_id: teamMember.teamId,
    user_id: teamMember.userId,
    role: teamMember.role,
    status: teamMember.status,
    first_name: teamMember.firstName,
    last_name: teamMember.lastName,
    email: teamMember.email,
  }))

  const { data, error } = await supabaseAdmin.from('team_members').insert(teamMembersData).select()

  if (error) {
    throw error
  }

  console.log(`Team member(s) inserted successfully: ${JSON.stringify(data)}`)

  return data
}
