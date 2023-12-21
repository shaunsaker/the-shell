import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from './Spinner'

type Variant =
  | 'primary'
  | 'primaryNeutral'
  | 'secondary'
  | 'secondaryNeutral'
  | 'secondaryInverted'
  | 'light'
  | 'lightNeutral'
  | 'lightInverted'
type Color = string
type Size = 'sm' | 'md' | 'lg' | 'xl'

const variantToClassNames: Record<Variant, string> = {
  primary:
    'shadow-md bg-theme-brand dark:bg-dark-theme-brand border-theme-brand dark:border-dark-theme-brand text-theme-brand-inverted dark:text-dark-theme-brand-inverted hover:bg-theme-brand-emphasis dark:hover:bg-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis',
  primaryNeutral:
    'bg-theme-background-muted dark:bg-dark-theme-background-muted border-theme-background-muted dark:border-dark-theme-background-muted text-theme-content dark:text-dark-theme-content hover:bg-theme-background-subtle dark:hover:bg-dark-theme-background-subtle hover:border-theme-background-subtle dark:hover:border-dark-theme-background-subtle',
  secondary:
    'shadow-md border-theme-brand dark:border-dark-theme-brand text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis bg-theme-background dark:bg-dark-theme-background',
  secondaryNeutral:
    'shadow-md border-theme-content dark:border-dark-theme-content text-theme-content dark:text-dark-theme-content hover:text-theme-content-emphasis dark:hover:text-dark-theme-content-emphasis hover:border-theme-content-emphasis dark:hover:border-dark-theme-content-emphasis hover:bg-theme-background-muted dark:hover:bg-dark-theme-background-muted',
  secondaryInverted: 'shadow-md text-white dark:text-white hover:bg-theme-brand-inverted/10',
  light:
    'border-transparent text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis',
  lightNeutral:
    'border-transparent text-theme-content dark:text-dark-theme-content hover:bg-theme-brand-inverted/10 hover:text-theme-content-emphasis dark:hover:text-dark-theme-content-emphasis',
  lightInverted:
    'border-transparent text-theme-content-inverted dark:text-dark-theme-content-inverted hover:bg-theme-brand-inverted/10 dark:hover:bg-dark-theme-brand-inverted/10',
}

const getColorClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    if (variant === 'primary') {
      return `shadow-md bg-${color}-500 border-${color}-500 text-theme-content-inverted hover:bg-${color}-700 dark:hover:bg-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
    }

    if (variant === 'secondary') {
      return `shadow-md border-${color}-500 dark:border-${color}-400 text-${color}-500 dark:text-${color}-400 hover:text-${color}-700 dark:hover:text-${color}-300 hover:border-${color}-700 dark:hover:border-${color}-300 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
    }

    if (variant === 'light') {
      return `border-transparent text-${color}-500 dark:text-${color}-400 hover:text-${color}-700 dark:hover:text-${color}-300 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
    }
  }

  return variantToClassNames[variant]
}

const sizeToButtonClassNames: Record<Size, string> = {
  sm: 'px-2 py-1 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-4 py-2 lg:px-6 lg:py-3 text-base rounded-xl',
  xl: 'px-8 py-4 lg:px-12 lg:py-6 text-xl rounded-2xl',
}

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
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
}: ButtonProps) => {
  const iconComponent = icon && <span className="h-4 min-w-[1rem]">{icon}</span>

  return (
    <button
      className={twMerge(
        'focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle flex items-center justify-center gap-x-2 overflow-hidden whitespace-nowrap border font-medium outline-2 outline-offset-4 transition-all focus-visible:outline',
        sizeToButtonClassNames[size],
        getColorClassNames(variant, color),
        disabled || loading ? 'pointer-events-none opacity-60 shadow-none' : '',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      <Spinner loading={loading} />

      {icon && iconPosition === 'left' && iconComponent}

      <span className="truncate">{children}</span>

      {icon && iconPosition === 'right' && iconComponent}
    </button>
  )
}
