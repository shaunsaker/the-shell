import React, { ReactElement, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Headerbar = ({ children }: Props): ReactElement => {
  return (
    <header className="border-theme-border bg-theme-background dark:border-dark-theme-border dark:bg-dark-theme-background flex h-16 w-full shrink-0 items-center border-b shadow-sm lg:pl-8">
      <div className="flex h-full w-full overflow-hidden">{children}</div>
    </header>
  )
}
