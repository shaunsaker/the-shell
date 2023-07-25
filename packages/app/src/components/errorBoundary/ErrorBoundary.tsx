import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, Metric, Text, Title } from '@tremor/react'
import React, { ReactElement, useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

import app from '../../../../common/app.json'
import { useLink } from '../../hooks/utils/useLink'
import { routes } from '../../routes'
import { sentry } from '../../sentry'

export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError() as { status: number; statusText: string; error: Error } | Error | undefined
  const navigate = useNavigate()
  const link = useLink()

  const errorIsError = error instanceof Error
  const status = errorIsError ? 500 : error ? error.status : '500'
  const statusText = errorIsError || !error ? 'Internal Server Error' : error.statusText
  const errorMessage = errorIsError ? error.message : error ? error.error?.message : ''

  useEffect(() => {
    if (error) {
      sentry.captureException(error)
    }
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title>{status}</Title>

      <Metric className="mt-4">{statusText}</Metric>

      <Text className="mt-4">{errorMessage}</Text>

      <div className="mt-8 flex gap-8">
        <Button
          onClick={() => {
            navigate(routes.dashboard)
          }}
        >
          Go back home
        </Button>

        <Button
          variant="light"
          icon={ArrowRightIcon}
          iconPosition="right"
          onClick={() => link(`mailto:${app.supportEmail}`, '_blank')}
        >
          Contact support
        </Button>
      </div>
    </div>
  )
}
