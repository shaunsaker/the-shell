import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'
import { SupabaseEmailTemplateVariables } from '../models'

const ChangeEmailAddress = () => {
  return (
    <Layout>
      <Title>Confirm change of email</Title>

      <Description>
        Follow this link to confirm the update of your email from{' '}
        <Link href={`mailto:${SupabaseEmailTemplateVariables.Email}`}>{SupabaseEmailTemplateVariables.Email}</Link> to{' '}
        <Link href={`mailto:${SupabaseEmailTemplateVariables.NewEmail}`}>
          {SupabaseEmailTemplateVariables.NewEmail}
        </Link>
        :
      </Description>

      <Button href={SupabaseEmailTemplateVariables.ConfirmationUrl}>Change email</Button>
    </Layout>
  )
}

export default ChangeEmailAddress
