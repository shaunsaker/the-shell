import { ReactNode } from 'react'

// UI
export type NavigationItem = {
  name: string
  href: string
  icon?: ReactNode
  active?: boolean
  disabled?: boolean
}

// TESTING
export enum TestIds {
  Loading = 'loading',
  SkeletonLoader = 'skeleton-loader',
}
