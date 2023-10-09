import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'
import { Text } from '../text/Text'

export type AlertKind = 'info' | 'success' | 'warning' | 'error'

const kindToBgColor: Record<AlertKind, string> = {
  info: `bg-theme-background-muted dark:bg-dark-theme-background-muted`,
  success: 'bg-green-50 dark:bg-green-900',
  warning: 'bg-orange-50 dark:bg-orange-900',
  error: 'bg-red-50 dark:bg-red-900',
}

const kindToBorderColor: Record<AlertKind, string> = {
  info: `border-theme-border dark:border-dark-theme-border`,
  success: 'border-green-200 dark:border-green-700',
  warning: 'border-orange-200 dark:border-orange-700',
  error: 'border-red-200 dark:border-red-700',
}

const kindToIcon: Record<AlertKind, typeof InformationCircleIcon> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
}

const kindToTextColor: Record<AlertKind, string> = {
  info: `text-theme-content dark:text-dark-theme-content-emphasis`,
  success: 'text-green-700 dark:text-dark-theme-content-emphasis',
  warning: 'text-orange-700 dark:text-dark-theme-content-emphasis',
  error: 'text-red-700 dark:text-dark-theme-content-emphasis',
}

type Props = {
  className?: string
  kind?: AlertKind
  children?: ReactNode
  onClose?: () => void
}

export const Alert = ({ className, kind = 'success', children, onClose }: Props): ReactElement => {
  const Icon = kindToIcon[kind]

  return (
    <div
      className={twMerge(
        'flex w-full max-w-lg items-center space-x-2 break-all rounded-md border px-3 py-2',
        kindToBgColor[kind],
        kindToBorderColor[kind],
        kindToTextColor[kind],
        className,
      )}
    >
      <div>
        <Icon className={`h-5 w-5 text-inherit`} />
      </div>

      <Text className="w-full text-inherit dark:text-inherit">{children}</Text>

      {onClose && (
        <Button
          className="p-0 text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit"
          variant="light"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
