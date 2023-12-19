import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import Logo from '../../assets/logo.svg'

type Props = ComponentPropsWithoutRef<'svg'> & {
  variant?: 'default' | 'inverted'
}

export const Logomark = ({ className, variant = 'default', ...props }: Props) => {
  return (
    <Logo
      className={twMerge(
        'h-8 w-auto',
        variant === 'default'
          ? 'stroke-fill-theme-brand fill-theme-brand dark:fill-dark-theme-brand dark:stroke-dark-theme-brand'
          : 'stroke-fill-theme-brand-inverted fill-theme-brand-inverted dark:fill-dark-theme-brand-inverted dark:stroke-dark-theme-brand-inverted',
        className,
      )}
      {...props}
    />
  )
}
