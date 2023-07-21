import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'
import { EmailTemplateVariables } from '../models'

const InviteUser = () => {
  return (
    <Layout>
      <Title>You have been invited</Title>

      <Description className="mt-2">
        You have been invited to create a user on{' '}
        <Link href={EmailTemplateVariables.SiteUrl}>{EmailTemplateVariables.SiteUrl}</Link>. Follow this link to accept
        the invite:
      </Description>

      <Button className="mt-8" href={EmailTemplateVariables.ConfirmationUrl}>
        Accept the invite
      </Button>
    </Layout>
  )
}

export default InviteUser
