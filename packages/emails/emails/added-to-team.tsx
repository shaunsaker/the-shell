import React, { ReactElement } from 'react'

import app from '../../config/app.json'
import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  userName: string
  teamName: string
  adminTeamMemberName: string
  buttonUrl: string
  buttonText: string
}

export const AddedToTeam = ({
  siteUrl,
  userName = '',
  teamName,
  adminTeamMemberName,
  buttonUrl,
  buttonText,
}: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description>
        You've been added to team "{teamName}" on {app.displayName} by {adminTeamMemberName}.
      </Description>

      <Button href={buttonUrl}>{buttonText}</Button>
    </Layout>
  )
}

export default AddedToTeam
