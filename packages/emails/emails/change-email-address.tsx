import React, { ReactElement } from 'react'

import { Button } from '../components/Button'
import { Description } from '../components/Description'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Title } from '../components/Title'

type Props = {
  siteUrl: string
  oldEmail: string
  newEmail: string
  confirmationUrl: string
}

export const ChangeEmailAddress = ({ siteUrl, oldEmail, newEmail, confirmationUrl }: Props): ReactElement => {
  return (
    <Layout siteUrl={siteUrl}>
      <Title>Confirm change of email</Title>

      <Description>
        Follow this link to confirm the update of your email from <Link href={`mailto:${oldEmail}`}>{oldEmail}</Link> to{' '}
        <Link href={`mailto:${newEmail}`}>{newEmail}</Link>:
      </Description>

      <Button href={confirmationUrl}>Change email</Button>
    </Layout>
  )
}

export default ChangeEmailAddress
