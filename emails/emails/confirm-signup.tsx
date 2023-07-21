import * as React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'
import { EmailTemplateVariables } from '../models'

const ConfirmSignup = () => {
  return (
    <Layout>
      <Title>Confirm your signup</Title>

      <Description className="mt-2">Follow this link to confirm your user:</Description>

      <Button className="mt-8" href={EmailTemplateVariables.ConfirmationUrl}>
        Confirm your mail
      </Button>
    </Layout>
  )
}

export default ConfirmSignup
