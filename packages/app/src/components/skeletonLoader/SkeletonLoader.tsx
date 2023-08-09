import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonLoaderProps = {
  className?: string
}

export const SkeletonLoader = ({ className }: SkeletonLoaderProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'animate-pulse h-8 w-full rounded-lg bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle',
        className,
      )}
    />
  )
}
