import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner } from './Spinner'

type Variant = 'primary' | 'secondary' | 'light'
type Color = string
type Size = 'sm' | 'md'

const variantToButtonClassNames: Record<Variant, string> = {
  primary:
    'shadow bg-theme-brand dark:bg-dark-theme-brand border-theme-brand dark:border-dark-theme-brand text-theme-brand-inverted dark:text-dark-theme-brand-inverted hover:bg-theme-brand-emphasis dark:hover:bg-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
  secondary:
    'shadow border-theme-brand dark:border-dark-theme-brand text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis hover:border-theme-brand-emphasis dark:hover:border-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
  light:
    'border-transparent text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle',
}

export const getButtonColorClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    if (variant === 'primary') {
      return `shadow bg-${color}-500 border-${color}-500 text-theme-content-inverted hover:bg-${color}-700 dark:hover:bg-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
    }

    if (variant === 'secondary') {
      return `shadow border-${color}-500 dark:border-${color}-400 text-${color}-500 dark:text-${color}-400 hover:text-${color}-700 dark:hover:text-${color}-300 hover:border-${color}-700 dark:hover:border-${color}-300 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
    }

    if (variant === 'light') {
      return `border-transparent text-${color}-500 dark:text-${color}-400 hover:text-${color}-700 dark:hover:text-${color}-300 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-400`
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
      <Spinner loading={loading} />

      {icon && iconPosition === 'left' && iconComponent}

      {children}

      {icon && iconPosition === 'right' && iconComponent}
    </button>
  )
}
