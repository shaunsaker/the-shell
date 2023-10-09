import { Bars3Icon } from '@heroicons/react/24/outline'
import React, { ReactElement, ReactNode } from 'react'

import { app } from '../../../../config'
import { Button } from '../button/Button'

type Props = {
  onOpenSidebar?: () => void
  children?: ReactNode
}

export const Headerbar = ({ onOpenSidebar, children }: Props): ReactElement => {
  return (
    <header className="border-theme-border bg-theme-background dark:border-dark-theme-border dark:bg-dark-theme-background flex h-16 w-full shrink-0 items-center border-b shadow-sm lg:pl-8">
      <Button
        variant="light"
        color={app.neutralColor}
        className="mr-2 lg:hidden"
        onClick={() => {
          if (onOpenSidebar) {
            onOpenSidebar()
          }
        }}
      >
        <span className="sr-only">Open sidebar</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <div className="flex h-full w-full justify-end overflow-hidden">{children}</div>
    </header>
  )
}
