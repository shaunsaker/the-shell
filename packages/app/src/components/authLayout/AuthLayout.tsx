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
    <PageLayout className="bg-theme-background-muted dark:bg-dark-theme-background-muted flex flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col items-center gap-y-4">
        <Logo />

        <Title className="text-center">{title}</Title>
      </div>

      <Card className="w-full max-w-lg space-y-6">{children}</Card>

      {footer && <div className="text-center">{footer}</div>}
    </PageLayout>
  )
}
