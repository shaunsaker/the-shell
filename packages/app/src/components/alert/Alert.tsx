import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Text } from '@tremor/react'
import React, { ReactElement } from 'react'

type Kind = 'success' | 'warning' | 'error'

const kindToBgColor = {
  success: 'bg-green-50 dark:bg-opacity-10',
  warning: 'bg-orange-50 dark:bg-opacity-10',
  error: 'bg-red-50 dark:bg-opacity-10',
}

const kindToIcon = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
}

const kindToIconColor = {
  success: 'text-green-500',
  warning: 'text-orange-500',
  error: 'text-red-500',
}

const kindToTextColor = {
  success: 'text-green-800',
  warning: 'text-orange-800',
  error: 'text-red-800',
}

type AlertProps = {
  kind?: Kind
  children?: string
}

export const Alert = ({ kind = 'success', children }: AlertProps): ReactElement => {
  const Icon = kindToIcon[kind]

  return (
    <div className={`flex w-full max-w-lg items-center space-x-2 rounded-md p-4 ${kindToBgColor[kind]}`}>
      <Icon className={`h-5 w-5 ${kindToIconColor[kind]}`} />

      <Text className={kindToTextColor[kind]}>{children}</Text>
    </div>
  )
}
