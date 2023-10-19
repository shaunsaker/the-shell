import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { app } from '../../../../config'
import { HeadingText } from '../headingText/HeadingText'
import { Logomark } from '../logomark/Logomark'

type Props = ComponentPropsWithoutRef<'div'>

export const Logo = ({ className, ...props }: Props) => {
  return (
    <div className={twMerge('flex items-center gap-x-2', className)} {...props}>
      <Logomark className={className} />

      <HeadingText className={twMerge('font-display whitespace-nowrap', className)}>{app.name}</HeadingText>
    </div>
  )
}
