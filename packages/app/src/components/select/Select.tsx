import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
  onValueChange: (value: SelectOption) => void
}

export const Select = ({ className = '', value, options, onValueChange, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: containerRef,
    callback: () => {
      if (open) {
        setOpen(false)
      }
    },
  })

  return (
    <div ref={containerRef} className={twMerge('relative', className)} {...props}>
      <Button
        className="min-w-[10rem] justify-between"
        variant="secondary"
        color="gray"
        icon={<ChevronDownIcon />}
        iconPosition="right"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {value}
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
