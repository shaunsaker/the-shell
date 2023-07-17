import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

import { useSidebarOpen } from '../../hooks/utils/useSidebarOpen'

type HeaderbarProps = {
  children?: ReactNode
}

export const Headerbar = ({ children }: HeaderbarProps): ReactElement => {
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <header className="flex h-16 w-full shrink-0 items-center border-b border-tremor-border bg-tremor-background px-8 shadow-sm dark:border-dark-tremor-border dark:bg-dark-tremor-background lg:pl-8">
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

      {children}
    </header>
  )
}
