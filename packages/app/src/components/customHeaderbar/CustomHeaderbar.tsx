import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar } from 'components'
import React, { ReactElement, ReactNode } from 'react'

import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

import { app } from '../../../../config'

type Props = {
  children?: ReactNode
}

export const CustomHeaderbar = ({ children }: Props): ReactElement => {
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <Headerbar>
      <Button
        variant="light"
        color={app.neutralColor}
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
