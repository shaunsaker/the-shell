'use client'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, Metric, Text, Title } from '@tremor/react'
import { app } from 'common'
import { useRouter } from 'next/navigation'

import { useLink } from '../hooks/utils/useLink'
import { routes } from '../routes'

// TODO: SS show logo and box
export default function NotFound() {
  const router = useRouter()
  const link = useLink()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title>404</Title>

      <Metric className="mt-4">Not Found</Metric>

      <Text className="mt-4">Could not find the requested resource.</Text>

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
