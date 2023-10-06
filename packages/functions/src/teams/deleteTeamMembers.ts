import { Firestore, TeamMember } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteTeamMembers = async (teamMembers: TeamMember[]) => {
  const batch = firebase.firestore().batch()

  teamMembers.forEach(teamMember => {
    const ref = firebase
      .firestore()
      .collection(Firestore.Teams)
      .doc(teamMember.teamId)
      .collection(Firestore.TeamMembers)
      .doc(teamMember.id)

    batch.delete(ref)
  })

  await batch.commit()
}
