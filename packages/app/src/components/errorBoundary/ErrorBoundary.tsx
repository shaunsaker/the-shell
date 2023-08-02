import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement, useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

import app from '../../../../common/app.json'
import { captureException } from '../../errors/captureException'
import { routes } from '../../routes'
import { useLink } from '../../utils/useLink'
import { BlankState } from '../blankState/BlankState'

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
      captureException(error)
    }
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <BlankState Icon={ExclamationCircleIcon} title={String(status)} description={errorMessage || statusText}>
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
      </BlankState>
    </div>
  )
}
