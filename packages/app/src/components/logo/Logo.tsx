import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import LogoSvg from '../../../../common/logo-inverted.svg'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props): ReactElement => {
  return <LogoSvg className={twMerge('fill-tremor-brand dark:fill-dark-tremor-brand h-8 w-auto', className)} />
}
