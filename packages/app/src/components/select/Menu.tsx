import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef } from 'react'

import { Button } from '../button/Button'
import { SelectOption } from './Select'

type Props = ComponentPropsWithoutRef<'ul'> & {
  options: SelectOption[]
  onValueChange: (value: SelectOption) => void
  onClose: () => void
}

export const Menu = ({ className = '', options, onValueChange, onClose, ...props }: Props) => {
  return (
    <AnimatePresence>
      <motion.ul
        className="bg-tremor-background dark:bg-dark-tremor-background absolute mt-2 flex w-full flex-col rounded border shadow"
        initial={{
          opacity: 0,
          transform: 'translateY(-4px)',
          scale: 0.95,
        }}
        animate={{ opacity: 1, transform: 'translateY(0px)', scale: 1 }}
        exit={{ opacity: 0, transform: 'translateY(4px)', scale: 0.95 }}
      >
        {options.map((option, index) => (
          <li key={option.value}>
            <Button
              className={`w-full justify-start px-4 py-2`}
              variant="light"
              // TODO: SS use neutral color
              color="gray"
              onClick={() => {
                onValueChange(option)
              }}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
