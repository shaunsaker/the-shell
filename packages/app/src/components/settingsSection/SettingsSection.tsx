import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Heading } from '../heading/Heading'
import { Text } from '../text/Text'

type SettingsSectionProps = {
  className?: string
  title: string
  description: string
  action?: ReactNode
  children?: ReactNode
  fullWidth?: boolean
}

export const SettingsSection = ({
  className,
  title,
  description,
  action,
  children,
  fullWidth,
}: SettingsSectionProps): ReactElement => {
  return (
    <section
      className={twMerge(
        'border-b-tremor-border dark:border-b-dark-tremor-border flex w-full border-b pb-8',
        className,
      )}
    >
      <div className={`flex w-full flex-col gap-y-6 ${fullWidth ? '' : 'max-w-lg'}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Heading>{title}</Heading>

            <Text className="mt-2">{description}</Text>
          </div>

          {action}
        </div>

        {children}
      </div>
    </section>
  )
}
