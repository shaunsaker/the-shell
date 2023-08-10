import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { getButtonClassNames } from './getButtonClassNames'

export type ButtonVariant = 'primary' | 'secondary' | 'light'
export type ButtonColor = string

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant
  color?: ButtonColor
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = ({
  className = '',
  variant = 'primary',
  color,
  loading,
  disabled,
  icon,
  iconPosition = 'left',
  children,
  ...props
}: Props): ReactElement => {
  const iconComponent = icon && <span className={twMerge('h-4 w-4')}>{icon}</span>

  return (
    <button
      className={twMerge(
        'flex items-center justify-center gap-x-2 rounded-lg border px-4 py-2 text-sm font-medium shadow transition-all focus-visible:outline-offset-4',
        getButtonClassNames(variant, color),
        disabled ? 'pointer-events-none opacity-40 shadow-none' : '',
        loading ? 'pointer-events-none' : '',
        className,
      )}
      {...props}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{
              opacity: 0,
              width: '0px',
            }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: '0px' }}
          >
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="fill-transparent opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {icon && iconPosition === 'left' && iconComponent}

      {children}

      {icon && iconPosition === 'right' && iconComponent}
    </button>
  )
}
