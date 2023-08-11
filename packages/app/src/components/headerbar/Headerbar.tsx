import { Bars3Icon } from '@heroicons/react/24/outline'
import React, { ReactElement, ReactNode } from 'react'

import { useSidebarOpen } from '../../utils/useSidebarOpen'
import { Button } from '../button/Button'

type Props = {
  children?: ReactNode
}

export const Headerbar = ({ children }: Props): ReactElement => {
  // eslint-disable-next-line
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <header className="border-theme-border bg-theme-background dark:border-dark-theme-border dark:bg-dark-theme-background flex h-16 w-full shrink-0 items-center border-b px-8 shadow-sm lg:pl-8">
      <Button
        variant="light"
        color="gray"
        className="-m-2.5 mr-4 lg:hidden"
        onClick={() => {
          setSidebarOpen(true)
        }}
      >
        <span className="sr-only">Open sidebar</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <div className="flex h-full flex-1 justify-end">{children}</div>
    </header>
  )
}
