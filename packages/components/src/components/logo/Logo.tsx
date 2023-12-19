import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { app } from '../../../../config'
import { HeadingText } from '../headingText/HeadingText'
import { Logomark } from '../logomark/Logomark'

type Props = ComponentPropsWithoutRef<'div'> & {
  variant?: 'default' | 'inverted'
}

export const Logo = ({ className, variant = 'default', ...props }: Props) => {
  return (
    <div className={twMerge('flex items-center gap-x-2', className)} {...props}>
      <Logomark className={className} variant={variant} />

      <HeadingText
        className={twMerge(
          'whitespace-nowrap',
          variant === 'inverted'
            ? 'text-theme-content-inverted dark:text-dark-theme-content-inverted'
            : 'text-theme-content dark:text-dark-theme-content',
          className,
        )}
      >
        {app.name}
      </HeadingText>
    </div>
  )
}
