import React, { ComponentProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type Props = ComponentProps<'input'> & { label?: string }

export const TextInput = ({ className = '', label, ...props }: Props): ReactElement => {
  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && <Text>{label}</Text>}

      <input
        className="text-tremor-content dark:text-tremor-content bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle border-tremor-border dark:border-dark-tremor-border rounded-lg border px-4 py-2 text-sm shadow-sm outline-offset-4 transition-colors"
        {...props}
      />
    </div>
  )
}
