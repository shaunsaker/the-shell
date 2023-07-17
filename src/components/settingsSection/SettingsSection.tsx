import { Text, Title } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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
        'flex w-full border-b border-b-tremor-border pb-8 dark:border-b-dark-tremor-border',
        className
      )}
    >
      <div className={`flex w-full flex-col gap-y-8 ${fullWidth ? '' : 'max-w-lg'}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Title>{title}</Title>

            <Text className="mt-2">{description}</Text>
          </div>

          {action}
        </div>

        {children}
      </div>
    </section>
  )
}
