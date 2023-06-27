import React, { ReactElement, ReactNode } from 'react'

type HeaderbarProps = {
  children?: ReactNode
}

export const Headerbar = ({ children }: HeaderbarProps): ReactElement => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-tremor-border bg-tremor-background px-8 pl-16 shadow-sm dark:border-dark-tremor-border dark:bg-dark-tremor-background lg:pl-8">
      {children}
    </header>
  )
}
