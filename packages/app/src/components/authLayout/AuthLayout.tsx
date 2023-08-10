import React, { ReactNode } from 'react'

import { Card } from '../card/Card'
import { Logo } from '../logo/Logo'
import { PageLayout } from '../pageLayout/PageLayout'
import { Title } from '../title/Title'

type Props = {
  title: string
  children?: ReactNode
  footer?: ReactNode
}

export const AuthLayout = ({ title, children, footer }: Props) => {
  return (
    <PageLayout className="flex flex-col items-center justify-center gap-y-6">
      <Logo />

      <Title>{title}</Title>

      <Card className="w-full max-w-lg">{children}</Card>

      {footer && <div className="text-center">{footer}</div>}
    </PageLayout>
  )
}
