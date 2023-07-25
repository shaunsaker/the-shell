import { Card, Metric } from '@tremor/react'
import React, { FormEvent, ReactElement, ReactNode } from 'react'

import { Logo } from '../logo/Logo'

type AuthLayoutProps = {
  title: string
  children?: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  footer?: ReactNode
}

export const AuthLayout = ({ title = '', children, onSubmit, footer }: AuthLayoutProps): ReactElement => {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-tremor-background-muted px-4 py-12 dark:bg-dark-tremor-background-muted sm:px-6 lg:px-8">
      <div className="flex w-full max-w-lg flex-col text-center">
        <Logo />

        <Metric className="mt-4">{title}</Metric>
      </div>

      <Card className="mt-10 w-full max-w-lg">
        <form className="space-y-6" onSubmit={onSubmit}>
          {children}
        </form>
      </Card>

      {footer ? <div className="mt-10 text-center">{footer}</div> : null}
    </div>
  )
}
