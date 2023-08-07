import React, { ComponentProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type TextInputProps = ComponentProps<'input'> & { label?: string }

export const TextInput = ({ className = '', label, ...props }: TextInputProps): ReactElement => {
  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && <Text>{label}</Text>}

      <input
        className="px-4 py-2 shadow-sm border rounded text-sm text-tremor-content dark:text-tremor-content hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle transition-colors"
        {...props}
      />
    </div>
  )
}
