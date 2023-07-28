import React, { ReactElement } from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  userName: string
  teamName: string
  teamMemberName: string
  url: string
}

export const AddedToTeam = ({ userName = '', teamName, teamMemberName, url }: Props): ReactElement => {
  return (
    <Layout>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description>
        You've been added to team "{teamName}" by {teamMemberName}.
      </Description>

      <Button href={url}>Go to your dashboard</Button>
    </Layout>
  )
}

export default AddedToTeam
