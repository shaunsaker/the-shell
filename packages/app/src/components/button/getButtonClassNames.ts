import { ButtonColor, ButtonVariant } from './Button'

const variantToButtonClassNames: Record<ButtonVariant, string> = {
  primary:
    'bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  secondary:
    'border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  light:
    'shadow-none border-none text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
}

export const getButtonClassNames = (variant: ButtonVariant, color?: ButtonColor): string => {
  if (color) {
    if (variant === 'primary') {
      return `bg-${color}-500 border-${color}-500 text-tremor-content-inverted hover:bg-${color}-700 dark:hover:bg-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'secondary') {
      return `border-${color}-500 dark:border-dark-${color}-500 text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 hover:border-${color}-700 dark:hover:border-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }

    if (variant === 'light') {
      return `shadow-none border-none text-${color}-500 dark:text-dark-${color}-500 hover:text-${color}-700 dark:hover:text-${color}-400 focus-visible:outline-${color}-400 dark:focus-visible:outline-${color}-800`
    }
  }

  return variantToButtonClassNames[variant]
}
