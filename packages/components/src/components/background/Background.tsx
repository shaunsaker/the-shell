import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'default' | 'inverted'

const variantToClassNames: Record<Variant, string> = {
  default:
    'from-theme-brand-subtle dark:from-dark-theme-brand-subtle to-theme-brand-emphasis dark:to-dark-theme-brand-emphasis',
  inverted: 'from-theme-brand-muted/30 dark:from-dark-theme-muted to-theme-background dark:to-dark-theme-background',
}

type Props = ComponentPropsWithoutRef<'div'> & {
  variant?: Variant
}

export const Background = ({ className = '', variant = 'default', children, ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]',
        variantToClassNames[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
