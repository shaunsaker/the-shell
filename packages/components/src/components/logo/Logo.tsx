import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { app } from '../../../../config'
import { Heading } from '../heading/Heading'
import { Logomark } from '../logomark/Logomark'

type Props = ComponentPropsWithoutRef<'div'>

export const Logo = ({ className, ...props }: Props): ReactElement => {
  return (
    <div className={twMerge('flex items-center gap-x-2', className)} {...props}>
      <Logomark className={className} />

      <Heading className={twMerge('font-display whitespace-nowrap', className)}>{app.name}</Heading>
    </div>
  )
}
