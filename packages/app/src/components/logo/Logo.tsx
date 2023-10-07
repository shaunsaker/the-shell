import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import LogoSvg from '../../../../config/logo-inverted.svg'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props): ReactElement => {
  return <LogoSvg className={twMerge('fill-theme-brand dark:fill-dark-theme-brand h-8 w-auto', className)} />
}
