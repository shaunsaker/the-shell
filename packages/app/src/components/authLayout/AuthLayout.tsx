import { Card } from '@tremor/react'
import React, { ReactNode } from 'react'

import { Logo } from '../logo/Logo'
import { Metric } from '../metric/Metric'

type AuthLayoutProps = {
  title: string
  children?: ReactNode
  footer?: ReactNode
}

export const AuthLayout = ({ title, children, footer }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-tremor-background-muted px-4 py-12 dark:bg-dark-tremor-background-muted sm:px-6 lg:px-8">
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">{title}</Metric>
      </div>

      <Card className="mx-4 mt-10 w-full max-w-lg">{children}</Card>

      {footer && <div className="mt-10 text-center">{footer}</div>}
    </div>
  )
}
