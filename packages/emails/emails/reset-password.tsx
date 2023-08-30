import React, { ReactElement } from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  confirmationUrl: string
}

export const ResetPassword = ({ siteUrl, confirmationUrl }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Reset password</Title>

      <Description>Follow this link to reset the password for your user:</Description>

      <Button href={confirmationUrl}>Reset password</Button>
    </Layout>
  )
}

export default ResetPassword
