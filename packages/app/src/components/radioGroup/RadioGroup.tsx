import { RadioGroup as RadioGroupPrimitive } from '@headlessui/react'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Option = {
  value: string
  label: string
}

type RadioGroupProps = {
  className?: string
  label?: string
  value: Option
  options: Option[]
  onChange: (value: Option) => void
}

export const RadioGroup = ({ className, label, value, options, onChange }: RadioGroupProps): ReactElement => {
  return (
    <RadioGroupPrimitive
      className={twMerge(
        'ring-tremor-border dark:ring-dark-tremor-border flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset',
        className,
      )}
      value={value}
      by="value"
      onChange={onChange}
    >
      {label && <RadioGroupPrimitive.Label className="sr-only">{label}</RadioGroupPrimitive.Label>}

      {options?.map(option => (
        <RadioGroupPrimitive.Option
          className={({ active, checked }) =>
            twMerge(
              active || checked
                ? 'bg-tremor-brand text-tremor-brand-inverted dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted'
                : 'text-tremor-content hover:bg-tremor-background-subtle dark:text-tremor-content hover:dark:bg-dark-tremor-background-subtle',
              'flex-1 cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 transition-colors',
            )
          }
          key={option.value}
          value={option}
        >
          {option.label}
        </RadioGroupPrimitive.Option>
      ))}
    </RadioGroupPrimitive>
  )
}
