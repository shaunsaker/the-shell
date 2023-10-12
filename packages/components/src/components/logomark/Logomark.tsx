import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import LogoSvg from '../../assets/logo.svg'

type Props = ComponentPropsWithoutRef<'svg'>

export const Logomark = ({ className, ...props }: Props): ReactElement => {
  return (
    <LogoSvg
      className={twMerge(
        'fill-theme-brand stroke-fill-theme-brand dark:fill-dark-theme-brand dark:stroke-dark-theme-brand h-8 w-auto',
        className,
      )}
      {...props}
    />
  )
}
