import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'secondary' | 'light'
type Color = string
type Size = 'sm' | 'md'

const variantToButtonClassNames: Record<Variant, string> = {
  primary:
    'bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  secondary:
    'border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  light:
    'shadow-none border-none text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
}

export const getButtonColorClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    if (variant === 'primary') {
      return `bg-${color}-500 border-${color}-500 text-tremor-content-inverted hover:bg-${color}-700 dark:hover:bg-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'secondary') {
      return `border-${color}-400 dark:border-dark-${color}-500 text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'light') {
      return `shadow-none border-none text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }
  }

  return variantToButtonClassNames[variant]
}

const sizeToButtonClassNames: Record<Size, string> = {
  sm: 'px-2 py-1 text-xs rounded',
  md: 'px-4 py-2 text-sm rounded-lg',
}

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  color?: Color
  size?: Size
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = ({
  className = '',
  variant = 'primary',
  color,
  size = 'md',
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
        'flex items-center justify-center gap-x-2 border font-medium shadow outline-offset-4 transition-all',
        getButtonColorClassNames(variant, color),
        sizeToButtonClassNames[size],
        disabled ? 'pointer-events-none opacity-60 shadow-none' : '',
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
