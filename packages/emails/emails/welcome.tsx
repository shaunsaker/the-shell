import React, { ReactElement } from 'react'

import app from '../../common/app.json'
import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  userName: string
  url: string
}

export const Welcome = ({ userName = '', url }: Props): ReactElement => {
  return (
    <Layout>
      <Title>Hi{userName ? ` ${userName}` : ''},</Title>

      <Description>Welcome to {app.displayName}! We're excited to have you on board.</Description>

      <Button href={url}>Go to your dashboard</Button>
    </Layout>
  )
}

export default Welcome
