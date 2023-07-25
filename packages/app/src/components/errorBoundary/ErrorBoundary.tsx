import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, Metric, Text, Title } from '@tremor/react'
import { app } from 'common'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { useLink } from '../../hooks/utils/useLink'
import { routes } from '../../routes'
import { sentry } from '../../sentry'

type ErrorBoundaryProps = {
  error: Error
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const router = useRouter()
  const link = useLink()

  useEffect(() => {
    if (error) {
      sentry.captureException(error)
    }
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title>500</Title>

      <Metric className="mt-4">Internal server error</Metric>

      <Text className="mt-4">{error.message}</Text>

      <div className="mt-8 flex gap-8">
        <Button
          onClick={() => {
            router.replace(routes.dashboard)
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
