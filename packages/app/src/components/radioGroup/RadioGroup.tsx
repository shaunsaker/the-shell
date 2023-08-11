import React, { ReactElement, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import app from '../../../../common/app.json'
import { Button } from '../button/Button'

type Option = {
  value: string
  label: string
}

type Props = {
  className?: string
  label?: string
  value: Option
  options: Option[]
  onValueChange: (value: Option) => void
}

export const RadioGroup = ({ className, label, value, options, onValueChange }: Props): ReactElement => {
  const [selected, setSelected] = useState(value)

  return (
    <div
      className={twMerge(
        'ring-theme-border dark:ring-dark-theme-border flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset',
        className,
      )}
    >
      {label && <label className="sr-only">{label}</label>}

      {options?.map(option => (
        <Button
          key={option.value}
          className={twMerge('rounded-full')}
          variant={selected.value === option.value ? 'primary' : 'light'}
          color={selected.value === option.value ? '' : app.neutralColor}
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
