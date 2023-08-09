import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonLoaderProps = {
  className?: string
}

export const SkeletonLoader = ({ className }: SkeletonLoaderProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle h-8 w-full animate-pulse rounded-lg',
        className,
      )}
    />
  )
}
