import React, { ReactElement } from 'react'

import app from '../../common/app.json'
import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  userName: string
  teamName: string
  adminTeamMemberName: string
}

export const AddedToTeam = ({ siteUrl, userName = '', teamName, adminTeamMemberName }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description>
        You've been added to team "{teamName}" on {app.displayName} by {adminTeamMemberName}.
      </Description>

      <Button href={siteUrl}>Go to your dashboard</Button>
    </Layout>
  )
}

export default AddedToTeam
