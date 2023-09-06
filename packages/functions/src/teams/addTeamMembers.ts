import { firebase } from '../firebaseAdmin'
import { TeamMember, TeamMemberRole, TeamMemberStatus } from '../models'

const parseTeamMemberRole = (role: string): TeamMemberRole => {
  switch (role) {
    case 'admin':
      return TeamMemberRole.Admin
    case 'member':
      return TeamMemberRole.Member
    default:
      return TeamMemberRole.Member
  }
}

const parseTeamMemberStatus = (status: string): TeamMemberStatus => {
  switch (status) {
    case 'active':
      return TeamMemberStatus.Active
    case 'invited':
      return TeamMemberStatus.Invited
    default:
      return TeamMemberStatus.Invited
  }
}

export const addTeamMembers = async (teamId: string, teamMembers: TeamMember[]) => {
  const teamMembersData = teamMembers.map(teamMember => ({
    ...teamMember,
    role: parseTeamMemberRole(teamMember.role),
    status: parseTeamMemberStatus(teamMember.status),
  }))

  const batch = firebase.firestore().batch()

  for (const teamMember of teamMembersData) {
    const teamMemberRef = firebase.firestore().collection('teams').doc(teamId).collection('members').doc(teamMember.id)

    batch.set(teamMemberRef, teamMember)
  }

  await batch.commit()
}
