import React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  emailVerificationLink: string
}

export const VerificationEmail = ({ siteUrl, emailVerificationLink }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Confirm your signup</Title>

      <Description>Follow this link to confirm your user:</Description>

      <Button href={emailVerificationLink}>Confirm your mail</Button>
    </Layout>
  )
}

export default VerificationEmail
