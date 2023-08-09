import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef } from 'react'

import { Button } from '../button/Button'

type Props = ComponentPropsWithoutRef<'ul'> & {
  options: { label: string; value: string }[]
  onValueChange: (value: string) => void
  onClose: () => void
}

export const Menu = ({ className = '', options, onValueChange, onClose, ...props }: Props) => {
  return (
    <AnimatePresence>
      <motion.ul
        className="absolute mt-2 border rounded shadow w-full flex flex-col bg-tremor-background dark:bg-dark-tremor-background"
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
              className={`px-4 py-2 w-full justify-start`}
              variant="light"
              // TODO: SS use neutral color
              color="gray"
              onClick={() => {
                onValueChange(option.value)
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
