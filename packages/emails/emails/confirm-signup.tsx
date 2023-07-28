import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'
import { SupabaseEmailTemplateVariables } from '../models'

const ConfirmSignup = () => {
  return (
    <Layout>
      <Title>Confirm your signup</Title>

      <Description>Follow this link to confirm your user:</Description>

      <Button href={SupabaseEmailTemplateVariables.ConfirmationUrl}>Confirm your mail</Button>
    </Layout>
  )
}

export default ConfirmSignup
