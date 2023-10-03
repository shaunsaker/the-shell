import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { TestIds } from '../../types'

type SkeletonLoaderProps = {
  className?: string
}

export const SkeletonLoader = ({ className }: SkeletonLoaderProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-theme-background-subtle dark:bg-dark-theme-background-subtle h-8 w-full animate-pulse rounded-lg',
        className,
      )}
      data-testid={TestIds.SkeletonLoader}
    />
  )
}
