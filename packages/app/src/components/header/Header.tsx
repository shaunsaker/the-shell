import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar } from 'components'
import React, { ReactElement, ReactNode } from 'react'

import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

type Props = {
  children?: ReactNode
}

export const Header = ({ children }: Props): ReactElement => {
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <Headerbar className="border-theme-border dark:border-dark-theme-border border-b shadow-sm">
      <Button
        variant="lightNeutral"
        className="mr-2 lg:hidden"
        onClick={() => {
          setSidebarOpen(true)
        }}
      >
        <span className="sr-only">Open sidebar</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Button>

      {children}
    </Headerbar>
  )
}
