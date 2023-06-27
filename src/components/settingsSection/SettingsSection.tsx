import { Text, Title } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SettingsSectionProps = {
  className?: string
  title: string
  description: string
  children?: ReactNode
}

export const SettingsSection = ({ className, title, description, children }: SettingsSectionProps): ReactElement => {
  return (
    <section
      className={twMerge(
        'flex w-full border-b border-b-tremor-border pb-8 dark:border-b-dark-tremor-border',
        className
      )}
    >
      <div className="flex w-full max-w-lg flex-col gap-y-8">
        <div>
          <Title>{title}</Title>

          <Text className="mt-2">{description}</Text>
        </div>

        {children}
      </div>
    </section>
  )
}
