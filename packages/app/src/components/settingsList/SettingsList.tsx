import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'main'>

export const SettingsList = ({ className = '', ...props }: Props) => {
  return <main className={twMerge('flex flex-col items-start gap-y-8', className)} {...props} />
}
