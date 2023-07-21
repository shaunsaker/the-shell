import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'
import { EmailTemplateVariables } from '../models'

const ChangeEmailAddress = () => {
  return (
    <Layout>
      <Title>Confirm change of email</Title>

      <Description className="mt-2">
        Follow this link to confirm the update of your email from{' '}
        <Link href={`mailto:${EmailTemplateVariables.Email}`}>{EmailTemplateVariables.Email}</Link> to{' '}
        <Link href={`mailto:${EmailTemplateVariables.NewEmail}`}>{EmailTemplateVariables.NewEmail}</Link>:
      </Description>

      <Button className="mt-8" href={EmailTemplateVariables.ConfirmationUrl}>
        Change email
      </Button>
    </Layout>
  )
}

export default ChangeEmailAddress
