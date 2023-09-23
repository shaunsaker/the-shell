import { TeamMember } from 'types'

import { firebase } from '../firebaseAdmin'

export const deleteTeamMembers = async (teamMembers: TeamMember[]) => {
  const batch = firebase.firestore().batch()

  teamMembers.forEach(teamMember => {
    const ref = firebase.firestore().collection('teams').doc(teamMember.teamId).collection('members').doc(teamMember.id)

    batch.delete(ref)
  })

  await batch.commit()
}
