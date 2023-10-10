import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

const TEST_ID = 'skeleton-loader'

type SkeletonLoaderProps = {
  className?: string
}

const SkeletonLoader = ({ className }: SkeletonLoaderProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-theme-background-subtle dark:bg-dark-theme-background-subtle h-8 w-full animate-pulse rounded-lg',
        className,
      )}
      data-testid={TEST_ID}
    />
  )
}

SkeletonLoader.TestId = TEST_ID

export { SkeletonLoader }
