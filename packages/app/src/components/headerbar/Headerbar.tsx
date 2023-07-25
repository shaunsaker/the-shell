'use client'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

import { useSidebarOpen } from '../../hooks/utils/useSidebarOpen'

type HeaderbarProps = {
  children?: ReactNode
}

export const Headerbar = ({ children }: HeaderbarProps): ReactElement => {
  // FIXME: this should be ignored, something is wrong with the eslint config
  // eslint-disable-next-line
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <header className="border-tremor-border bg-tremor-background dark:border-dark-tremor-border dark:bg-dark-tremor-background flex h-16 w-full shrink-0 items-center border-b px-8 shadow-sm lg:pl-8">
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
