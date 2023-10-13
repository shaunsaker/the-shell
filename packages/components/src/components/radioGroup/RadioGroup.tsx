import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'

type Option = {
  value: string
  label: string
}

type Props = {
  className?: string
  value: string
  options: Option[]
  onValueChange: (option: Option) => void
}

export const RadioGroup = ({ className, value, options, onValueChange }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'ring-theme-border dark:ring-dark-theme-border flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset',
        className,
      )}
    >
      {options?.map(option => {
        const isSelected = option.value === value

        return (
          <Button
            key={option.value}
            className={twMerge('rounded-full')}
            variant={isSelected ? 'primary' : 'lightNeutral'}
            size="sm"
            onClick={() => {
              onValueChange(option)
            }}
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
