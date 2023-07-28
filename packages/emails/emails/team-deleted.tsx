import React, { ReactElement } from 'react'

import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  userName: string
  teamName: string
  teamMemberName: string
}

export const TeamDeleted = ({ userName = '', teamName, teamMemberName }: Props): ReactElement => {
  return (
    <Layout>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description className="mb-8">
        The "{teamName}" team has been deleted by {teamMemberName} and you are no longer a member.
      </Description>
    </Layout>
  )
}

export default TeamDeleted
