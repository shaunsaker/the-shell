import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useKeypress } from '../../utils/useKeyPress'
import { useOutsideClick } from '../../utils/useOutsideClick'
import { Button } from '../button/Button'
import { Menu } from './Menu'

export type SelectOption = {
  value: string
  label: string
}

type Props = ComponentPropsWithoutRef<'div'> & {
  value: string
  options: SelectOption[]
  disabled?: boolean
  onValueChange: (option: SelectOption) => void
}

export const Select = ({ className = '', value, options, disabled, onValueChange, ...props }: Props) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const label = options.find(option => option.value === value)?.label || ''

  useOutsideClick(containerRef, () => {
    if (open) {
      setOpen(false)
    }
  })

  useKeypress('Escape', () => {
    if (open) {
      setOpen(false)
    }
  })

  return (
    <div ref={containerRef} className={twMerge('relative', className)} {...props}>
      <Button
        className="min-w-[10rem] justify-between"
        variant="secondary"
        color="gray"
        icon={<ChevronDownIcon />}
        iconPosition="right"
        disabled={disabled}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {label}
      </Button>

      <AnimatePresence>
        {open && (
          <Menu
            options={options}
            onValueChange={value => {
              onValueChange(value)
              setOpen(false)
            }}
            onClose={() => {
              setOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
