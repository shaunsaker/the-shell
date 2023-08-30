import { motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import app from '../../../../common/app.json'
import { useOutsideClick } from '../../utils/useOutsideClick'
import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { SelectOption } from './Select'

type Props = ComponentPropsWithoutRef<'ul'> & {
  options: SelectOption[]
  onValueChange: (value: SelectOption) => void
  onClose: () => void
}

export const Menu = ({ className = '', options, onValueChange, onClose, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick({ ref, callback: onClose })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        transform: 'translateY(-4px)',
        scale: 0.95,
      }}
      animate={{ opacity: 1, transform: 'translateY(0px)', scale: 1 }}
      exit={{ opacity: 0, transform: 'translateY(-4px)', scale: 0.95 }}
    >
      <Card className="absolute mt-2 p-0">
        <ul {...props} className={twMerge(className)}>
          {options.map(option => (
            <li key={option.value}>
              <Button
                className={`w-full justify-start px-4 py-2`}
                variant="light"
                color={app.neutralColor}
                onClick={() => {
                  onValueChange(option)
                }}
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
