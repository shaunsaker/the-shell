import React, { ComponentProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type Props = ComponentProps<'input'> & { label?: string }

export const TextInput = ({ className = '', label, ...props }: Props): ReactElement => {
  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && <Text>{label}</Text>}

      <input
        className="text-theme-content bg-theme-background dark:bg-dark-theme-background hover:bg-theme-background-muted dark:hover:bg-dark-theme-background-muted focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle border-theme-border dark:border-dark-theme-border disabled:bg-theme-background-muted dark:disabled:bg-dark-theme-background-muted rounded-lg border px-4 py-2 text-sm shadow-sm outline-offset-4 transition-colors disabled:cursor-not-allowed dark:text-white"
        {...props}
      />
    </div>
  )
}
