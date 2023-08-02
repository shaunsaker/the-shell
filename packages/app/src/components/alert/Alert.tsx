import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { Text } from '@tremor/react'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import app from '../../../../common/app.json'

export type AlertKind = 'info' | 'success' | 'warning' | 'error'

// TODO: SS in dark mode the text color loses opacity
const kindToBgColor: Record<AlertKind, string> = {
  info: `bg-${app.neutralColor}-50 dark:bg-opacity-10`,
  success: 'bg-green-50 dark:bg-opacity-10',
  warning: 'bg-orange-50 dark:bg-opacity-10',
  error: 'bg-red-50 dark:bg-opacity-10',
}

const kindToBorderColor: Record<AlertKind, string> = {
  info: `border-${app.neutralColor}-100`,
  success: 'border-green-100',
  warning: 'border-orange-100',
  error: 'border-red-100',
}

// FIXME: types
const kindToIcon: Record<AlertKind, any> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
}

const kindToIconColor: Record<AlertKind, string> = {
  info: `text-${app.neutralColor}-500`,
  success: 'text-green-500',
  warning: 'text-orange-500',
  error: 'text-red-500',
}

const kindToTextColor: Record<AlertKind, string> = {
  info: `text-${app.neutralColor}-500`,
  success: 'text-green-800',
  warning: 'text-orange-800',
  error: 'text-red-800',
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
        'flex w-full max-w-lg items-center space-x-2 rounded-md p-4 border',
        kindToBgColor[kind],
        kindToBorderColor[kind],
        className,
      )}
    >
      <Icon className={`h-5 w-5 ${kindToIconColor[kind]}`} />

      <Text className={kindToTextColor[kind]}>{children}</Text>
    </div>
  )
}
