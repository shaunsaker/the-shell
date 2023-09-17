import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'secondary' | 'light'
type Color = string
type Size = 'sm' | 'md'

const variantToButtonClassNames: Record<Variant, string> = {
  primary:
    'shadow bg-theme-brand dark:bg-dark-theme-brand border-theme-brand dark:border-dark-theme-brand text-theme-brand-inverted dark:text-dark-theme-brand-inverted hover:bg-theme-brand-emphasis dark:hover:bg-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
  secondary:
    'shadow border-theme-brand dark:border-dark-theme-brand text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
  light:
    'border-transparent rounded-none text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
}

export const getButtonColorClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    if (variant === 'primary') {
      return `shadow bg-${color}-500 border-${color}-500 text-theme-content-inverted hover:bg-${color}-700 dark:hover:bg-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'secondary') {
      return `shadow border-${color}-400 dark:border-dark-${color}-500 text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'light') {
      return `border-transparent rounded-none text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
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
        'flex items-center justify-center gap-x-2 whitespace-nowrap border font-medium outline-2 outline-offset-4 transition-all focus-visible:outline',
        sizeToButtonClassNames[size],
        getButtonColorClassNames(variant, color),
        disabled || loading ? 'pointer-events-none opacity-60 shadow-none' : '',
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
