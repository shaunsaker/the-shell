import React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  link: string
}

export const ResetPassword = ({ siteUrl, link }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Reset password</Title>

      <Description>Follow this link to reset the password for your user:</Description>

      <Button href={link}>Reset password</Button>
    </Layout>
  )
}

export default ResetPassword
