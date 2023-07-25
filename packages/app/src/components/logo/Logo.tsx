import Image from 'next/image'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import logo from '../../../public/icon.svg'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps): ReactElement => {
  return (
    <Image
      className={twMerge('fill-tremor-brand dark:fill-dark-tremor-brand', className)}
      src={logo}
      alt="Logo"
      width={32}
      height={32}
    />
  )
}
