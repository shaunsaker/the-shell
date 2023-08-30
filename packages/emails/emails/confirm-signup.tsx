import React, { ReactElement } from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  confirmationUrl: string
}

export const ConfirmSignup = ({ siteUrl, confirmationUrl }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Confirm your signup</Title>

      <Description>Follow this link to confirm your user:</Description>

      <Button href={confirmationUrl}>Confirm your mail</Button>
    </Layout>
  )
}

export default ConfirmSignup
