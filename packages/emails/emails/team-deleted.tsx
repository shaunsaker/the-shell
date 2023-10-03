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

export const TeamDeleted = ({ siteUrl, userName = '', teamName, adminTeamMemberName }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description className="mb-8">
        The "{teamName}" team has been deleted by {adminTeamMemberName} and you are no longer a member.
      </Description>
    </Layout>
  )
}

export default TeamDeleted
