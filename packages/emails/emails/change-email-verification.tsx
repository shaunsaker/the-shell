import React, { ReactElement } from 'react'

import { Button } from '@/components/Button'
import { Description } from '@/components/Description'
import { Layout } from '@/components/Layout'
import { Title } from '@/components/Title'

type Props = {
  siteUrl: string
  emailVerificationLink: string
}

export const ChangeEmailVerification = ({ siteUrl, emailVerificationLink }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Confirm your new email</Title>

      <Description>Follow this link to confirm your new email:</Description>

      <Button href={emailVerificationLink}>Confirm your mail</Button>
    </Layout>
  )
}

export default ChangeEmailVerification
