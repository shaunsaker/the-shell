import React, { ReactElement, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'

type Option = {
  value: string
  label: string
}

type RadioGroupProps = {
  className?: string
  label?: string
  value: Option
  options: Option[]
  onValueChange: (value: Option) => void
}

export const RadioGroup = ({ className, label, value, options, onValueChange }: RadioGroupProps): ReactElement => {
  const [selected, setSelected] = useState(value)

  return (
    <div
      className={twMerge(
        'ring-tremor-border dark:ring-dark-tremor-border flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset',
        className,
      )}
    >
      {label && <label className="sr-only">{label}</label>}

      {options?.map(option => (
        <Button
          key={option.value}
          className={twMerge('rounded-full')}
          variant={selected.value === option.value ? 'primary' : 'light'}
          // TODO: SS use neutral color
          color={selected.value === option.value ? '' : 'gray'}
          size="sm"
          onClick={() => {
            setSelected(option)
            onValueChange(option)
          }}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
