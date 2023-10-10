import { Heading, Logo, SlimLayout } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'

type Props = {
  title: string
} & ComponentPropsWithoutRef<'div'>

export const AuthLayout = ({ title, children, ...props }: Props) => {
  return (
    <SlimLayout {...props}>
      <div className="space-y-10">
        <Logo />

        <Heading>{title}</Heading>

        {children}
      </div>
    </SlimLayout>
  )
}
