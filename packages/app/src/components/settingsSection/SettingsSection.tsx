import { HeadingText, SmallText } from 'components'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  title: string
  description: string
  action?: ReactNode
  children?: ReactNode
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'section'>

export const SettingsSection = ({ className, title, description, action, children, fullWidth, ...props }: Props) => {
  return (
    <section
      className={twMerge(
        'border-b-theme-border dark:border-b-dark-theme-border flex w-full border-b pb-8 lg:pb-12',
        className,
      )}
      {...props}
    >
      <div className={`flex w-full flex-col gap-y-6 ${fullWidth ? '' : 'max-w-lg'}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <HeadingText>{title}</HeadingText>

            <SmallText className="mt-2">{description}</SmallText>
          </div>

          {action}
        </div>

        {children}
      </div>
    </section>
  )
}
