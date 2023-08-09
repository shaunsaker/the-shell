import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { ComponentPropsWithoutRef, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useOutsideClick } from '../../utils/useOutsideClick'
import { Button } from '../button/Button'
import { Menu } from './Menu'

type Props = ComponentPropsWithoutRef<'div'> & {
  value: string
  options: { label: string; value: string }[]
  onValueChange: (value: string) => void
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
        className="outline-offset-4 border min-w-[10rem] justify-between rounded-lg shadow-sm px-4 py-2 text-sm text-tremor-content dark:text-tremor-content hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle transition-colors"
        variant="light"
        color="gray"
        icon={<ChevronDownIcon />}
        iconPosition="right"
        onClick={event => {
          setOpen(!open)
        }}
      >
        {value}
      </Button>

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
    </div>
  )
}
