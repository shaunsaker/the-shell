import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'secondary' | 'light'

const variantToIconClassNames: Record<Variant, string> = {
  primary: 'text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted',
  secondary: 'text-tremor-brand dark:text-dark-tremor-brand',
  light: 'text-tremor-brand dark:text-dark-tremor-brand',
}

const variantToButtonClassNames: Record<Variant, string> = {
  primary:
    'bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  secondary:
    'bg-tremor-background dark:bg-dark-tremor-background border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  light:
    'shadow-none border-none bg-tremor-background dark:bg-dark-tremor-background text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
}

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

// TODO: SS Button color
export const Button = ({
  className = '',
  variant = 'primary',
  loading,
  disabled,
  icon,
  iconPosition = 'left',
  children,
  ...props
}: Props): ReactElement => {
  const iconComponent = icon && <span className={twMerge('h-4 w-4', variantToIconClassNames[variant])}>{icon}</span>

  return (
    <button
      className={twMerge(
        'flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border px-4 py-2 text-sm font-medium shadow outline-offset-4 transition-all',
        variantToButtonClassNames[variant],
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
