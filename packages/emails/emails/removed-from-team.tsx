import React, { ReactElement } from 'react'

import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  userName: string
  teamName: string
  teamMemberName: string
}

export const RemovedFromTeam = ({ userName = '', teamName, teamMemberName }: Props): ReactElement => {
  return (
    <Layout>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description className="mb-8">
        You've been removed from team "{teamName}" by {teamMemberName}.
      </Description>
    </Layout>
  )
}

export default RemovedFromTeam
