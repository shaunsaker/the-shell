import React, { ReactElement } from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  confirmationUrl: string
}

export const InviteUser = ({ siteUrl, confirmationUrl }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>You have been invited</Title>

      <Description>
        You have been invited to create a user on <Link href={siteUrl}>{siteUrl}</Link>. Follow this link to accept the
        invite:
      </Description>

      <Button href={confirmationUrl}>Accept the invite</Button>
    </Layout>
  )
}

export default InviteUser
