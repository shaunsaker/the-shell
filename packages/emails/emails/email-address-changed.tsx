import React from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  oldEmail: string
  newEmail: string
}

export const EmailAddressChanged = ({ siteUrl, oldEmail, newEmail }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Email address was changed</Title>

      <Description>
        Your email address was changed from <Link href={`mailto:${oldEmail}`}>{oldEmail}</Link> to{' '}
        <Link href={`mailto:${newEmail}`}>{newEmail}</Link>.
      </Description>

      <Button href={siteUrl}>Go to your dashboard</Button>
    </Layout>
  )
}

export default EmailAddressChanged
