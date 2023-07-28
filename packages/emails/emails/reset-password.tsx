import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'
import { SupabaseEmailTemplateVariables } from '../models'

const ResetPassword = () => {
  return (
    <Layout>
      <Title>Reset password</Title>

      <Description>Follow this link to reset the password for your user:</Description>

      <Button href={SupabaseEmailTemplateVariables.ConfirmationUrl}>Reset password</Button>
    </Layout>
  )
}

export default ResetPassword
