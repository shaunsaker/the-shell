import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'secondary' | 'light'

type Color = string

const variantToIconClassNames: Record<Variant, string> = {
  primary: 'text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted',
  secondary: 'text-tremor-brand dark:text-dark-tremor-brand',
  light: 'text-tremor-brand dark:text-dark-tremor-brand',
}

const getIconClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    return `text-white`
  }

  return variantToIconClassNames[variant]
}

const variantToButtonClassNames: Record<Variant, string> = {
  primary:
    'bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  secondary:
    'bg-tremor-background dark:bg-dark-tremor-background border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
  light:
    'shadow-none border-none bg-tremor-background dark:bg-dark-tremor-background text-tremor-brand dark:text-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis focus-visible:outline-tremor-brand-subtle dark:focus-visible:outline-dark-tremor-brand-subtle',
}

const getButtonClassNames = (variant: Variant, color?: Color): string => {
  if (color) {
    if (color === 'slate') {
      return `bg-slate-500 border-slate-500 text-white hover:bg-slate-700 hover:border-slate-700 focus-visible:outline-slate-400`
    }

    if (color === 'gray') {
      return `bg-gray-500 border-gray-500 text-white hover:bg-gray-700 hover:border-gray-700 focus-visible:outline-gray-400`
    }

    if (color === 'zinc') {
      return `bg-zinc-500 border-zinc-500 text-white hover:bg-zinc-700 hover:border-zinc-700 focus-visible:outline-zinc-400`
    }

    if (color === 'neutral') {
      return `bg-neutral-500 border-neutral-500 text-white hover:bg-neutral-700 hover:border-neutral-700 focus-visible:outline-neutral-400`
    }

    if (color === 'stone') {
      return `bg-stone-500 border-stone-500 text-white hover:bg-stone-700 hover:border-stone-700 focus-visible:outline-stone-400`
    }

    if (color === 'red') {
      return `bg-red-500 border-red-500 text-white hover:bg-red-700 hover:border-red-700 focus-visible:outline-red-400`
    }

    if (color === 'orange') {
      return `bg-orange-500 border-orange-500 text-white hover:bg-orange-700 hover:border-orange-700 focus-visible:outline-orange-400`
    }

    if (color === 'amber') {
      return `bg-amber-500 border-amber-500 text-white hover:bg-amber-700 hover:border-amber-700 focus-visible:outline-amber-400`
    }

    if (color === 'yellow') {
      return `bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-700 hover:border-yellow-700 focus-visible:outline-yellow-400`
    }

    if (color === 'lime') {
      return `bg-lime-500 border-lime-500 text-white hover:bg-lime-700 hover:border-lime-700 focus-visible:outline-lime-400`
    }

    if (color === 'green') {
      return `bg-green-500 border-green-500 text-white hover:bg-green-700 hover:border-green-700 focus-visible:outline-green-400`
    }

    if (color === 'emerald') {
      return `bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-700 hover:border-emerald-700 focus-visible:outline-emerald-400`
    }

    if (color === 'teal') {
      return `bg-teal-500 border-teal-500 text-white hover:bg-teal-700 hover:border-teal-700 focus-visible:outline-teal-400`
    }

    if (color === 'cyan') {
      return `bg-cyan-500 border-cyan-500 text-white hover:bg-cyan-700 hover:border-cyan-700 focus-visible:outline-cyan-400`
    }

    if (color === 'sky') {
      return `bg-sky-500 border-sky-500 text-white hover:bg-sky-700 hover:border-sky-700 focus-visible:outline-sky-400`
    }

    if (color === 'blue') {
      return `bg-blue-500 border-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 focus-visible:outline-blue-400`
    }

    if (color === 'indigo') {
      return `bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-700 hover:border-indigo-700 focus-visible:outline-indigo-400`
    }

    if (color === 'violet') {
      return `bg-violet-500 border-violet-500 text-white hover:bg-violet-700 hover:border-violet-700 focus-visible:outline-violet-400`
    }

    if (color === 'purple') {
      return `bg-purple-500 border-purple-500 text-white hover:bg-purple-700 hover:border-purple-700 focus-visible:outline-purple-400`
    }

    if (color === 'fuschia') {
      return `bg-fuschia-500 border-fuschia-500 text-white hover:bg-fuschia-700 hover:border-fuschia-700 focus-visible:outline-fuschia-400`
    }

    if (color === 'pink') {
      return `bg-pink-500 border-pink-500 text-white hover:bg-pink-700 hover:border-pink-700 focus-visible:outline-pink-400`
    }

    if (color === 'rose') {
      return `bg-rose-500 border-rose-500 text-white hover:bg-rose-700 hover:border-rose-700 focus-visible:outline-rose-400`
    }
  }

  return variantToButtonClassNames[variant]
}

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  color?: Color
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
  const iconComponent = icon && <span className={twMerge('h-4 w-4', getIconClassNames(variant, color))}>{icon}</span>

  return (
    <button
      className={twMerge(
        'flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border px-4 py-2 text-sm font-medium shadow outline-offset-4 transition-all',
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
