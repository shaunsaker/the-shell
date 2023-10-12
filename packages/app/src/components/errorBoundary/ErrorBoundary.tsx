import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, ErrorPage } from 'components'
import React, { ReactElement, useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

import { useCaptureException } from '@/errors/hooks/useCaptureException'
import { routes } from '@/router/routes'
import { useLink } from '@/utils/useLink'

import { app } from '../../../../config'

export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError() as { status: number; statusText: string; error: Error } | Error | undefined
  const { mutate: captureException } = useCaptureException()
  const navigate = useNavigate()
  const link = useLink()

  const errorIsError = error instanceof Error
  const status = errorIsError ? 500 : error ? error.status : '500'
  const errorMessage = errorIsError ? error.message : error ? error.error?.message : ''
  const statusText = errorIsError || !error ? 'Internal Server Error' : error.statusText

  useEffect(() => {
    if (error) {
      captureException(error)
    }
  }, [captureException, error])

  return (
    <ErrorPage title={String(status)} description={errorMessage || statusText}>
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
          icon={<ArrowRightIcon />}
          iconPosition="right"
          onClick={() => link(`mailto:${app.supportEmail}`, '_blank')}
        >
          Contact support
        </Button>
      </div>
    </ErrorPage>
  )
}
