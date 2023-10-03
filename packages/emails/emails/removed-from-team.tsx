import React, { ReactElement } from 'react'

import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  userName: string
  teamName: string
  adminTeamMemberName: string
}

export const RemovedFromTeam = ({ siteUrl, userName = '', teamName, adminTeamMemberName }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description className="mb-8">
        You've been removed from team "{teamName}" by {adminTeamMemberName}.
      </Description>
    </Layout>
  )
}

export default RemovedFromTeam
