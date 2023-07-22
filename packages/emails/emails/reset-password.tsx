import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'
import { EmailTemplateVariables } from '../models'

const ResetPassword = () => {
  return (
    <Layout>
      <Title>Reset password</Title>

      <Description className="mt-2">Follow this link to reset the password for your user:</Description>

      <Button className="mt-8" href={EmailTemplateVariables.ConfirmationUrl}>
        Reset password
      </Button>
    </Layout>
  )
}

export default ResetPassword
