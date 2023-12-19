import { HeadingText, SlimLayout } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'

type Props = {
  title: string
} & ComponentPropsWithoutRef<'div'>

export const AuthLayout = ({ title, children, ...props }: Props) => {
  return (
    <SlimLayout {...props}>
      <div className="space-y-8">
        <HeadingText>{title}</HeadingText>

        {children}
      </div>
    </SlimLayout>
  )
}
