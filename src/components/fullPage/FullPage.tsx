import React, { forwardRef, ReactNode } from 'react'

type FullPageProps = {
  children?: ReactNode
}

export const FullPage = forwardRef(({ children }: FullPageProps, ref: any) => {
  return (
    <div
      ref={ref}
      className="flex min-h-full flex-1 flex-col items-center justify-center bg-tremor-background-muted px-4 py-12 dark:bg-dark-tremor-background-muted sm:px-6 lg:px-8"
    >
      {children}
    </div>
  )
})
