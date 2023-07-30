import { supabaseAdmin } from '../supabaseAdmin'
import { Database } from '../types/supabase'

const parseTeamMemberRole = (role: string): Database['public']['Enums']['team_member_role'] => {
  switch (role) {
    case 'admin':
      return 'admin'
    case 'member':
      return 'member'
    default:
      return 'member'
  }
}

const parseTeamMemberStatus = (status: string): Database['public']['Enums']['team_member_status'] => {
  switch (status) {
    case 'active':
      return 'active'
    case 'invited':
      return 'invited'
    default:
      return 'invited'
  }
}

export const addTeamMembers = async (
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
    role: parseTeamMemberRole(teamMember.role),
    status: parseTeamMemberStatus(teamMember.status),
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
