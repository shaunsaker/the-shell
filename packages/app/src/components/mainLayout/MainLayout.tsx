import { Popover } from 'components'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useReleaseNotesDialogOpen } from '@/releaseNotesDialog/hooks/useReleaseNotesDialogOpen'
import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

import { AppSidebar } from '../appSidebar/AppSidebar'
import { ReleaseNotesDialog } from '../releaseNotesDialog/ReleaseNotesDialog'

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()
  const [releaseNotesDialogOpen, setReleaseNotesDialogOpen] = useReleaseNotesDialogOpen()

  const sidebar = <AppSidebar />

  return (
    <>
      <div className="flex h-full">
        <div className="lg:hidden">
          <Popover
            open={sidebarOpen}
            onClose={() => {
              setSidebarOpen(false)
            }}
          >
            {sidebar}
          </Popover>
        </div>

        <div className="hidden shrink-0 lg:flex lg:flex-col">{sidebar}</div>

        <div className="bg-theme-background dark:bg-dark-theme-background flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>

      <ReleaseNotesDialog
        open={releaseNotesDialogOpen}
        onClose={() => {
          setReleaseNotesDialogOpen(false)
        }}
      />
    </>
  )
}
