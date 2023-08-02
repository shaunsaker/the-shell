import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import LogoSvg from '../../../../common/logo-inverted.svg'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps): ReactElement => {
  return <LogoSvg className={twMerge('h-8 w-auto fill-tremor-brand dark:fill-dark-tremor-brand', className)} />
}
