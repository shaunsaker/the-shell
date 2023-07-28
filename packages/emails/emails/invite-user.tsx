import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'
import { SupabaseEmailTemplateVariables } from '../models'

const InviteUser = () => {
  return (
    <Layout>
      <Title>You have been invited</Title>

      <Description>
        You have been invited to create a user on{' '}
        <Link href={SupabaseEmailTemplateVariables.SiteUrl}>{SupabaseEmailTemplateVariables.SiteUrl}</Link>. Follow this
        link to accept the invite:
      </Description>

      <Button href={SupabaseEmailTemplateVariables.ConfirmationUrl}>Accept the invite</Button>
    </Layout>
  )
}

export default InviteUser
