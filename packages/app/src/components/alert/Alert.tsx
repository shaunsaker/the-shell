import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

export type AlertKind = 'info' | 'success' | 'warning' | 'error'

const kindToBgColor: Record<AlertKind, string> = {
  info: `bg-tremor-background-muted dark:bg-dark-tremor-background-muted`,
  success: 'bg-green-50 dark:bg-green-900',
  warning: 'bg-orange-50 dark:bg-orange-900',
  error: 'bg-red-50 dark:bg-red-900',
}

const kindToBorderColor: Record<AlertKind, string> = {
  info: `border-tremor-border dark:border-dark-tremor-border`,
  success: 'border-green-200 dark:border-green-700',
  warning: 'border-orange-200 dark:border-orange-700',
  error: 'border-red-200 dark:border-red-700',
}

// FIXME: types
const kindToIcon: Record<AlertKind, any> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
}

const kindToTextColor: Record<AlertKind, string> = {
  info: `text-tremor-content dark:text-dark-tremor-content`,
  success: 'text-green-700 dark:text-green-200',
  warning: 'text-orange-700 dark:text-green-200',
  error: 'text-red-700 dark:text-green-200',
}

type AlertProps = {
  className?: string
  kind?: AlertKind
  children?: string
}

export const Alert = ({ className, kind = 'success', children }: AlertProps): ReactElement => {
  const Icon = kindToIcon[kind]

  return (
    <div
      className={twMerge(
        'flex w-full max-w-lg items-center space-x-2 rounded-md border p-4',
        kindToBgColor[kind],
        kindToBorderColor[kind],
        className,
      )}
    >
      <Icon className={`h-5 w-5 ${kindToTextColor[kind]}`} />

      <Text className={kindToTextColor[kind]}>{children}</Text>
    </div>
  )
}
